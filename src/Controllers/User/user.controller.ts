/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Request, Response } from 'express-serve-static-core'
import { logger } from '../../Utils/logger'
import { refreshLoginValidation, userLoginValidation, userValidation } from '../../Validations/user.validation'
import HttpObjectResult from '../../Utils/exceptions'
import UserLogic from '../../Services/User/user.service'

const userLogic = new UserLogic()

export default class UserController {
  /**
   * RegisterUser
   */
  public RegisterUser() {
    return RegisterUserController
  }

  /**
   * GetAllUser
   */
  public GetAllUser() {
    return GetAllUserController
  }

  /**
   * LoginUser
   */
  public LoginUser() {
    return LoginUserController
  }

  /**
   * RefreshUser
   */
  public RefreshUser() {
    return RefreshUserController
  }
}

const RegisterUserController = async (req: Request, res: Response) => {
  try {
    const { error, value } = userValidation(req.body)
    if (error) {
      logger.error(`Unable to parse request body: ${error.details[0].message}`)
      return HttpObjectResult(res, 422, false, null, error.details[0].message)
    }

    const dto = await userLogic.RegisterUser(value)

    logger.info('post user success')
    return HttpObjectResult(res, 201, true, dto)
  } catch (error) {
    logger.error(error)
    const err: any = error
    const msg: string = err.message
    if (msg.includes('11000')) {
      return HttpObjectResult(res, 400, false, null, 'User already exist')
    }
    return HttpObjectResult(res, 500, false, null, `${(error as any).message}`)
  }
}

const GetAllUserController = async (req: Request, res: Response) => {
  try {
    const users = await userLogic.GetAllUser()

    logger.info('get users success')
    return HttpObjectResult(res, 200, true, users)
  } catch (error) {
    logger.error(error)
    return HttpObjectResult(res, 500, false, null, `${(error as any).message}`)
  }
}

const LoginUserController = async (req: Request, res: Response) => {
  try {
    const { error, value } = userLoginValidation(req.body)
    if (error) {
      logger.error(`Unable to parse request body: ${error.details[0].message}`)
      return HttpObjectResult(res, 422, false, null, error.details[0].message)
    }

    const token = await userLogic.LoginUser(value)
    logger.info('Login success')
    return HttpObjectResult(res, 200, true, { expire: 60, ...token })
  } catch (error) {
    logger.error(error)

    return HttpObjectResult(res, 500, false, null, `${(error as any).message}`)
  }
}

const RefreshUserController = async (req: Request, res: Response) => {
  try {
    const { error, value } = refreshLoginValidation(req.body)
    if (error) {
      logger.error(`Unable to parse request body: ${error.details[0].message}`)
      return HttpObjectResult(res, 422, false, null, error.details[0].message)
    }

    const token = await userLogic.RefreshAccessToken(value.refreshToken)
    logger.info('refresh token success')
    return HttpObjectResult(res, 200, true, { expire: 60, accessToken: token })
  } catch (error) {
    logger.error(error)

    return HttpObjectResult(res, 500, false, null, `${(error as any).message}`)
  }
}
