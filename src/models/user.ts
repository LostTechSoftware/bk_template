import { Schema, model } from 'mongoose'
import UserInterface from '../interfaces/models/UserInterface'

const UserSchema = new Schema<UserInterface>(
  {
    name: String,
    email: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

export default model('User', UserSchema)
