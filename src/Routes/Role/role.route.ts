import { Router } from 'express'
import RoleController from '../../Controllers/Role/role.controller'
import permit from '../../Middleware/auth'

export const roleRouter: Router = Router()
const controller = new RoleController()
roleRouter.get('/', permit('Admin'), controller.CreateRole())
roleRouter.post('/insert', permit('Admin'), controller.GetAllRole())
