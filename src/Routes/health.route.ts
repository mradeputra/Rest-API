import { type Response, type Request, type NextFunction, Router } from 'express'

export const healthRouter: Router = Router()

healthRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({ status: 200 })
})
