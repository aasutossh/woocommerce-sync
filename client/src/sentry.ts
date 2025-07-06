import * as Sentry from '@sentry/react'

Sentry.init({
  dsn: 'https://1862f153d01a677114f28e696b307ef5@o4504094003691520.ingest.us.sentry.io/4509619547537408',

  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/react/configuration/options/#sendDefaultPii
  sendDefaultPii: true,

  integrations: []
})
