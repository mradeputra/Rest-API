import { Router } from 'express'
import permit from '../../Middleware/auth'
import { CreateRoleController, GetAllRoleController } from '../../Controllers/Role/role.controller'

export const roleRouter: Router = Router()

roleRouter.get('/', permit('Admin'), GetAllRoleController)
roleRouter.post('/insert', permit('Admin'), CreateRoleController)
