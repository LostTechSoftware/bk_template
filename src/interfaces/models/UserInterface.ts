import { Document } from 'mongoose'

interface UserInterface extends Document {
  email?: string
  name?: string
}

export default UserInterface
