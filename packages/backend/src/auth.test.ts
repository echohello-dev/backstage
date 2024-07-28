import request from 'supertest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import {
  mockServices,
  registerMswTestHooks,
  startTestBackend,
} from '@backstage/backend-test-utils';
import { Server } from 'http';
import { githubAuth } from './auth';

describe('githubAuth', () => {
  let server: Server;
  let baseUrl: string;

  const mockGithubAuth = setupServer(
    // Mock GitHub's OAuth endpoints
    http.get('https://github.com/login/oauth/authorize', params => {
      const url = new URL(params.request.url);
      const callbackUrl = new URL(url.searchParams.get('redirect_uri')!);
      callbackUrl.searchParams.set('code', 'github_auth_code');
      callbackUrl.searchParams.set('state', url.searchParams.get('state')!);
      return HttpResponse.redirect(callbackUrl.toString());
    }),

    http.post('https://github.com/login/oauth/access_token', () => {
      return HttpResponse.json({
        access_token: 'github_access_token',
        token_type: 'bearer',
        scope: 'read:user',
      });
    }),

    http.get('https://api.github.com/user', () => {
      return HttpResponse.json({
        login: 'octocat',
        name: 'Octocat',
        email: 'octocat@github.com',
        avatar_url: 'https://github.com/images/error/octocat_happy.gif',
      });
    }),
  );

  registerMswTestHooks(mockGithubAuth);

  beforeAll(async () => {
    const backend = await startTestBackend({
      features: [
        githubAuth,
        import('@backstage/plugin-auth-backend'),
        mockServices.rootConfig.factory({
          data: {
            app: { baseUrl: 'http://localhost:3000' },
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

    server = backend.server;
    baseUrl = `http://localhost:${backend.server.port()}`;
    mockGithubAuth.listen();
  });

  afterAll(() => {
    server.close();
  });

  it('should complete the GitHub auth flow', async () => {
    // Start the auth flow
    const startResponse = await request(server)
      .get('/api/auth/github/start?env=development')
      .expect(302);

    const startUrl = new URL(startResponse.header.location);
    expect(startUrl.searchParams.get('response_type')).not.toBeNull();
    expect(startUrl.searchParams.get('redirect_uri')).not.toBeNull();

    // Simulate the OAuth callback
    const callbackUrl = new URL('/api/auth/github/handler/frame', baseUrl);
    callbackUrl.searchParams.set('env', 'development');
    callbackUrl.searchParams.set('code', 'github_auth_code');
    callbackUrl.searchParams.set('state', 'mock_state');

    const handlerResponse = await request(server).get(
      callbackUrl.pathname + callbackUrl.search,
    );

    expect(handlerResponse.status).toBe(200);
  });
});
