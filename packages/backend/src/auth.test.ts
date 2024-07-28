/* eslint-disable @typescript-eslint/no-shadow */
import request from 'supertest';
import { decodeOAuthState } from '@backstage/plugin-auth-node';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import {
  mockServices,
  registerMswTestHooks,
  startTestBackend,
} from '@backstage/backend-test-utils';
import { Server } from 'http';
import { githubAuth } from './auth';

let accessToken: string;

const githubApiUrl = 'https://api.github.com';
const githubAuthUrl = 'https://github.com/login/oauth';

const handlers = [
  http.get(`${githubAuthUrl}/authorize`, ({ request }) => {
    const url = new URL(request.url);
    const callbackUrl = new URL(url.searchParams.get('redirect_uri')!);
    callbackUrl.searchParams.set('code', 'github_auth_code');
    callbackUrl.searchParams.set('state', url.searchParams.get('state')!);
    return HttpResponse.json(null, {
      status: 302,
      headers: {
        location: callbackUrl.toString(),
      },
    });
  }),
  http.post(`${githubAuthUrl}/access_token`, () => {
    accessToken = 'github_access_token';
    return HttpResponse.json({
      access_token: accessToken,
      token_type: 'bearer',
      scope: 'read:user',
    });
  }),
  http.get(`${githubApiUrl}/user`, ({ request }) => {
    if (request.headers.get('Authorization') === `token ${accessToken}`) {
      return HttpResponse.json({
        login: 'octocat',
        name: 'Octocat',
        email: 'octocat@github.com',
        avatar_url: 'https://github.com/images/error/octocat_happy.gif',
      });
    }
    return new HttpResponse(null, { status: 401 });
  }),
];

const mswServer = setupServer(...handlers);
registerMswTestHooks(mswServer);

describe('githubAuth', () => {
  let backstageServer: Server;
  let appUrl: string;

  beforeAll(async () => {
    mswServer.listen();
    const backend = await startTestBackend({
      features: [
        githubAuth,
        import('@backstage/plugin-auth-backend'),
        mockServices.rootConfig.factory({
          data: {
            app: { baseUrl: 'http://localhost' },
            auth: {
              providers: {
                github: {
                  development: {
                    clientId: 'github-client-id',
                    clientSecret: 'github-client-secret',
                  },
                },
              },
            },
          },
        }),
      ],
    });

    backstageServer = backend.server;
    const port = backend.server.port();
    appUrl = `http://localhost:${port}`;
  });

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    mswServer.resetHandlers();
  });

  afterAll(() => {
    backstageServer.close();
    mswServer.close();
  });

  it('should start the GitHub auth flow', async () => {
    // Arrange
    const agent = request.agent(backstageServer);

    // Act
    const startResponse = await agent.get(
      '/api/auth/github/start?env=development',
    );
    const startUrl = new URL(startResponse.get('location')!);
    const expected = Object.fromEntries(startUrl.searchParams);
    const state = decodeOAuthState(startUrl.searchParams.get('state')!);

    // Assert
    expect(startResponse.status).toEqual(302);
    expect(startUrl.origin).toBe('https://github.com');
    expect(startUrl.pathname).toBe('/login/oauth/authorize');
    expect(expected).toEqual({
      client_id: 'github-client-id',
      redirect_uri: `${appUrl}/api/auth/github/handler/frame`,
      response_type: 'code',
      scope: 'read:user',
      state: expect.any(String),
    });
    expect(state.env).toEqual('development');
    expect(state.nonce).toBeDefined();
    expect(state.scope).toEqual('read:user');
  });

  it('should complete the GitHub auth flow', async () => {
    const agent = request.agent(backstageServer);

    // Start the auth flow
    const startResponse = await agent.get(
      '/api/auth/github/start?env=development',
    );
    expect(startResponse.status).toBe(302);
    const test = await agent.get(
      '/api/auth/github/handler/frame?code=github_auth_code&state=6e6f6e63653d70595572584f37374363597a786f57414c2532465042325125334425334426656e763d646576656c6f706d656e742673636f70653d7265616425334175736572',
    );
    expect(test.text).toContain('test');
    expect(startResponse.status).toBe(302);

    const startUrl = new URL(startResponse.get('location')!);
    const state = startUrl.searchParams.get('state')!;
    const decodedState = decodeOAuthState(state);
    const nonce = decodedState.nonce;

    // Set the nonce cookie
    agent.jar.setCookie(`github-nonce=${nonce}; Path=/; HttpOnly`);

    // Simulate the OAuth callback
    const callbackUrl = new URL(`${appUrl}/api/auth/github/handler/frame`);
    callbackUrl.searchParams.set('code', 'github_auth_code');
    callbackUrl.searchParams.set('state', state);

    const handlerResponse = await agent.get(
      callbackUrl.href.replace(callbackUrl.origin, ''),
    );
    expect(handlerResponse.status).toBe(200);

    expect(handlerResponse.text).toContain(
      encodeURIComponent(`"accessToken":"${accessToken}"`),
    );
  });
});
