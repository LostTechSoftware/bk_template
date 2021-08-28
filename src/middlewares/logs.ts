import { Application, Response, NextFunction } from 'express'
import httpContext from 'express-http-context'
import { v4 as uuidv4 } from 'uuid'

import LoggerRequestInterface from '../interfaces/middlewares/LoggerRequestInterface'
import logs from '../logs'

class Logger {
  public async index(app: Application): Promise<void> {
    app.all('*', (req: LoggerRequestInterface, res: Response, next: NextFunction): void => {
      const requestId = req.headers['request_id'] || uuidv4()

      req.requestId = requestId

      httpContext.set('requestId', requestId)

      logs.info(`[${req.method}] ${req.path}`)
      logs.info(logs.beautify(req.body))

      return next()
    })
  }
}

export default new Logger()
