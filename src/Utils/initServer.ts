import bodyParser from 'body-parser'
import cors from 'cors'
import express, { Application } from 'express'
import { routes } from '../Routes'
import deserializeToken from '../Middleware/deserialize'

const InitServer = () => {
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

  return app
}

export default InitServer
