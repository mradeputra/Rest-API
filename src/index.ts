import { type Application } from 'express'
import { logger } from './Utils/logger'

// connect to database
import './Utils/connectDB'

import InitServer from './Utils/initServer'

const app: Application = InitServer()
const port: number = 3000

app.listen(port, () => {
  logger.info(`Server run on port ${port}`)
})
