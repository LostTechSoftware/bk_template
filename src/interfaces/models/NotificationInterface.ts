import { Document } from 'mongoose'

interface NotificationInterface extends Document {
  title?: string
  body?: string
  send?: number
  convert?: number
  schedule?: Date
  tokens?: [string]
  sended?: boolean
}

export default NotificationInterface
