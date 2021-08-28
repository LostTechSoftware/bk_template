import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import httpContext from 'express-http-context'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'

import routes from './routes'
import logsMiddlewares from './middlewares/logs'
import logs from './logs'
import sentry from './services/sentry'
import consumers from './services/consumers'

class App {
  public express: express.Application

  public constructor() {
    this.express = express()

    this.middlewares()
    this.database()
    this.setupSentry()
    this.setuplogs()
    this.security()
    this.routes()
    this.setupConsumers()
  }

  private middlewares(): void {
    this.express.use(express.json())
    this.express.use(cors())
    this.express.use(httpContext.middleware)
  }

  private security(): void {
    const rateLimiter = rateLimit({
      windowMs: 1 * 60 * 1000,
      max: 500,
      keyGenerator: (req) => {
        return req.ip
      },
      handler: (_, res) => {
        res.status(429).send('Limit of requests is hit-in')
      },
    })

    this.express.use(rateLimiter)
    this.express.use(helmet())
  }

  private database(): void {
    mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })

    logs.info('Database connected')
  }

  private setuplogs(): void {
    logsMiddlewares.index(this.express)
  }

  private setupSentry(): void {
    sentry(this.express)
  }

  private setupConsumers(): void {
    consumers.backofficeConsumer()
  }

  private routes(): void {
    this.express.use(routes)
  }
}

export default new App().express
