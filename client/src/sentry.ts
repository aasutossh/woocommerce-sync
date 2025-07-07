import * as Sentry from '@sentry/react'

const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN
Sentry.init({
  dsn: SENTRY_DSN,

  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/react/configuration/options/#sendDefaultPii
  sendDefaultPii: true,

  integrations: []
})
