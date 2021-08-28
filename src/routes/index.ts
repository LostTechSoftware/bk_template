import { Router } from 'express'

import Health from '../controllers/Health'

const routes = Router()

routes.get('/health', Health.index)

export default routes
