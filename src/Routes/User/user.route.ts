import { Router } from 'express'
import permit from '../../Middleware/auth'
import UserController from '../../Controllers/User/user.controller'

export const userRouter: Router = Router()
const controller = new UserController()

userRouter.get('/', permit('Admin'), controller.GetAllUser())
userRouter.post('/register', controller.RegisterUser())
userRouter.post('/login', controller.LoginUser())
userRouter.post('/refresh', controller.RefreshUser())
