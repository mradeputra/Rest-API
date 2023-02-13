import bodyParser from 'body-parser'
import express, { type Application } from 'express'
import { routes } from './Routes'
import { logger } from './Utils/logger'
import cors from 'cors'

// connect to database
import './Utils/connectDB'

// deserialize token
import deserializeToken from './Middleware/deserialize'

const app: Application = express()
const port: number = 3000

// parser body request
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// cors handler
app.use(cors())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  next()
})

app.use(deserializeToken)

// routes
routes(app)

app.listen(port, () => {
  logger.info(`Server run on port ${port}`)
})
