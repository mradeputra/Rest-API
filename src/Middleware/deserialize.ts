/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { Request, Response, NextFunction } from 'express'
import { CustomResponse } from '../Utils/exceptions'
import { verifyJwt } from '../Utils/jwt'

const deserializeToken = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.headers.authorization?.replace('Bearer ', '')
  if (!accessToken) {
    return next()
  }
  const { decoded, expired } = verifyJwt(accessToken)
  if (decoded) {
    res.locals.user = decoded
    return next()
  }
  if (expired) {
    return res.status(401).send(CustomResponse(401, false, { message: 'Expired token, please login again' }))
  }
  return next()
}

export default deserializeToken
