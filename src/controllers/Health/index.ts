import { Request, Response } from 'express'
import logs from '../../logs'
import User from '../../models/user'

class Health {
  public async index(req: Request, res: Response): Promise<Response> {
    try {
      await User.find()

      return res.status(200).json('OK')
    } catch (err) {
      logs.error(err)
      return res.status(400).json('Error in get users')
    }
  }
}

export default new Health()
