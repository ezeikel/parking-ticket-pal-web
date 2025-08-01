import posthog from 'posthog-js';
import * as Sentry from '@sentry/nextjs';

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  ui_host: 'https://eu.posthog.com', // keep the UI host for toolbar links (EU region)
  defaults: '2025-05-24',
});

// eslint-disable-next-line import/prefer-default-export
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
