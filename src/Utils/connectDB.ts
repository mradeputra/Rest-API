import mongoose from 'mongoose'
import config from '../Config/environment'
import { logger } from './logger'

mongoose
  .connect(config.courseDB ?? '')
  .then(() => {
    logger.info('connected to database')
  })
  .catch((error) => {
    logger.info('could not connect to database')
    logger.error(error)
    process.exit(1)
  })
