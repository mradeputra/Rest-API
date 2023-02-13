/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Request, Response } from 'express-serve-static-core'
import { logger } from '../../Utils/logger'
import { refreshLoginValidation, userLoginValidation, userValidation } from '../../Validations/user.validation'
import { RegisterUser, GetAllUser, LoginUser, refreshAccessToken } from '../../Services/User/user.service'
import { CustomResponse } from '../../Utils/exceptions'

export const RegisterUserController = async (req: Request, res: Response) => {
  try {
    const { error, value } = userValidation(req.body)
    if (error) {
      logger.error(`Unable to parse request body: ${error.details[0].message}`)
      return res.status(422).send(CustomResponse(422, false, { message: error.details[0].message }))
    }

    const dto = await RegisterUser(value)

    logger.info('post user success')
    return res.status(201).send(CustomResponse(201, true, { data: dto }))
  } catch (error) {
    logger.error(error)
    const err: any = error
    const msg: string = err.message
    if (msg.includes('11000')) {
      return res.status(400).send(CustomResponse(400, false, { message: 'User already exist' }))
    }
    return res.status(500).send(CustomResponse(500, false, { message: msg }))
  }
}

export const GetAllUserController = async (req: Request, res: Response) => {
  try {
    const users = await GetAllUser()

    logger.info('get users success')
    return res.status(200).send(CustomResponse(200, true, { data: users }))
  } catch (error) {
    logger.error(error)
    return res.status(500).send(CustomResponse(500, false, { message: `${error}` }))
  }
}

export const LoginUserController = async (req: Request, res: Response) => {
  try {
    const { error, value } = userLoginValidation(req.body)
    if (error) {
      logger.error(`Unable to parse request body: ${error.details[0].message}`)
      return res.status(422).send(CustomResponse(422, false, { message: error.details[0].message }))
    }

    const token = await LoginUser(value)
    logger.info('Login success')
    return res.status(200).send(CustomResponse(200, true, { data: { expire: 60, ...token } }))
  } catch (error) {
    logger.error(error)

    return res
      .status(500)
      .send(CustomResponse(500, false, { message: `${error}`, data: { expire: 0, accessToken: '' } }))
  }
}

export const RefreshUserController = async (req: Request, res: Response) => {
  try {
    const { error, value } = refreshLoginValidation(req.body)
    if (error) {
      logger.error(`Unable to parse request body: ${error.details[0].message}`)
      return res.status(422).send(CustomResponse(422, false, { message: error.details[0].message }))
    }

    const token = await refreshAccessToken(value.refreshToken)
    logger.info('refresh token success')
    return res.status(200).send(CustomResponse(200, true, { data: { expire: 60, accessToken: token } }))
  } catch (error) {
    logger.error(error)

    return res
      .status(500)
      .send(CustomResponse(500, false, { message: `${error}`, data: { expire: 0, accessToken: '' } }))
  }
}
