/* eslint-disable consistent-return */
/* eslint-disable no-console */
import { configApiRef, useApi } from '@backstage/core-plugin-api';
import { useEffect, useCallback, useRef } from 'react';

interface EventOptions {
  callback?: () => void;
  props?: Record<string, unknown>;
  revenue?: number;
}

type PlausibleFunction = (eventName: string, options?: EventOptions) => void;

declare global {
  interface Window {
    plausible?: PlausibleFunction;
    plausible_has_sent_pageview?: boolean;
    _phantom?: unknown;
    __nightmare?: unknown;
    Cypress?: unknown;
    __plausible?: unknown;
  }
}

export const usePlausible = () => {
  const config = useApi(configApiRef);
  const enabled = config.getOptionalBoolean('plausible.enabled') ?? false;
  const domain = config.getOptionalString('plausible.dataDomain');
  const apiHost =
    config.getOptionalString('plausible.apiHost') ??
    'https://plausible.echohello.dev';

  const ignoreEvent = useCallback(
    (reason: string | null, options?: EventOptions) => {
      if (reason) console.warn(`Ignoring Event: ${reason}`);
      if (options?.callback) options.callback();
    },
    [],
  );

  const sendEvent = useCallback(
    (eventName: string, options: EventOptions = {}) => {
      if (!enabled || !domain) return;

      const location = window.location;

      // Ignore events on localhost or when testing
      // if (
      //   /^localhost$|^127(\.[0-9]+){0,2}\.[0-9]+$|^\[::1?\]$/.test(
      //     location.hostname,
      //   ) ||
      //   location.protocol === 'file:'
      // ) {
      //   return ignoreEvent('localhost', options);
      // }

      if (
        (window._phantom ||
          window.__nightmare ||
          window.navigator.webdriver ||
          window.Cypress) &&
        !window.__plausible
      ) {
        return ignoreEvent(null, options);
      }

      // Check localStorage flag
      try {
        if (window.localStorage.plausible_ignore === 'true') {
          return ignoreEvent('localStorage flag', options);
        }
      } catch (e) {
        // Ignore localStorage errors
      }

      const eventData: {
        n: string;
        u: string;
        d: string;
        r: string | null;
        w: number;
        p?: string;
        m?: string;
      } = {
        n: eventName,
        u: (options.props?.url as string) || location.href,
        d: domain,
        r: document.referrer || null,
        w: window.innerWidth,
      };

      if (options.props) {
        eventData.p = JSON.stringify(options.props);
      }

      if (options.revenue) {
        eventData.m = JSON.stringify({ revenue: options.revenue });
      }

      const request = new XMLHttpRequest();
      request.open('POST', `${apiHost}/api/event`, true);
      request.setRequestHeader('Content-Type', 'text/plain');

      request.send(JSON.stringify(eventData));

      request.onreadystatechange = () => {
        if (request.readyState === 4 && options.callback) {
          options.callback();
        }
      };
    },
    [enabled, domain, apiHost, ignoreEvent],
  );

  const trackEvent = useCallback(
    (eventName: string, options: EventOptions = {}) => {
      if (!enabled) {
        console.warn('Plausible is not enabled. Event not tracked.');
        return;
      }

      if (eventName === 'pageview') {
        sendEvent(eventName, options);
      } else {
        if (!window.plausible_has_sent_pageview) {
          sendEvent('pageview');
          window.plausible_has_sent_pageview = true;
        }
        sendEvent(eventName, options);
      }
    },
    [enabled, sendEvent],
  );

  useEffect(() => {
    if (!enabled || !domain) return;

    let lastPath: string | undefined;

    const trackPageview = () => {
      if (lastPath !== window.location.pathname) {
        lastPath = window.location.pathname;
      }
    };

    // Track initial pageview
    trackPageview();
    window.plausible_has_sent_pageview = true;

    // Set up tracking for navigation changes
    window.addEventListener('popstate', trackPageview);

    // Override history methods
    const originalPushState = history.pushState;
    history.pushState = (...args) => {
      originalPushState.apply(this, args);
      trackPageview();
    };

    return () => {
      window.removeEventListener('popstate', trackPageview);
      history.pushState = originalPushState;
    };
  }, [enabled, domain]);

  return { trackEvent };
};
