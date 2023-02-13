import Joi from 'joi'
import { UserLoginPayloadDto, UserPayloadDto } from '../DAL/Models/User/user.model'

export const userValidation = (payload: UserPayloadDto) => {
  const schema = Joi.object({
    id: Joi.string(),
    email: Joi.string().required(),
    name: Joi.string().required(),
    password: Joi.string().required(),
    roleType: Joi.string().required()
  })
  return schema.validate(payload)
}

export const userLoginValidation = (payload: UserLoginPayloadDto) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
  })
  return schema.validate(payload)
}

export const refreshLoginValidation = (payload: UserLoginPayloadDto) => {
  const schema = Joi.object({
    refreshToken: Joi.string().required()
  })
  return schema.validate(payload)
}
