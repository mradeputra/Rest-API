import { Router } from 'express'
import permit from '../../Middleware/auth'
import {
  RegisterUserController,
  GetAllUserController,
  LoginUserController,
  RefreshUserController
} from '../../Controllers/User/user.controller'

export const userRouter: Router = Router()

userRouter.get('/', permit('Admin'), GetAllUserController)
userRouter.post('/register', RegisterUserController)
userRouter.post('/login', LoginUserController)
userRouter.post('/refresh', RefreshUserController)
