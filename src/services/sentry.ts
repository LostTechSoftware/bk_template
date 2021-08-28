import { Application } from 'express'
import * as Sentry from '@sentry/node'
import * as Tracing from '@sentry/tracing'

const sentry = (app: Application): void => {
  Sentry.init({
    dsn: process.env.SENTRY_URL,
    environment: process.env.NODE_ENV,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Tracing.Integrations.Express({
        app,
      }),
    ],
    tracesSampleRate: 1.0,
  })

  app.use(Sentry.Handlers.requestHandler())
  app.use(Sentry.Handlers.errorHandler())
  app.use(Sentry.Handlers.tracingHandler())
}

export default sentry
