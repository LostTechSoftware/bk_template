import { Request } from 'express'

interface LoggerRequestInterface extends Request {
  requestId?: string
}

export default LoggerRequestInterface
