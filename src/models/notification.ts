import { Schema, model } from 'mongoose'
import NotificationInterface from '../interfaces/models/NotificationInterface'

const NotificationSchema = new Schema<NotificationInterface>(
  {
    title: String,
    body: String,
    send: {
      type: Number,
      default: 0,
    },
    convert: {
      type: Number,
      default: 0,
    },
    schedule: Date,
    tokens: [],
    sended: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

export default model('Notification', NotificationSchema)
