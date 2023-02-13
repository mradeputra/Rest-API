import Joi from 'joi'
import { RoleDto } from '../DAL/Models/Role/role.model'

export const roleValidation = (payload: RoleDto) => {
  const schema = Joi.object({
    id: Joi.string(),
    name: Joi.string().required(),
    description: Joi.string().required()
  })
  return schema.validate(payload)
}
