import Joi from 'joi'
import { CourseDto } from '../DAL/Models/Course/course.model'

export const courseValidation = (payload: CourseDto) => {
  const schema = Joi.object({
    id: Joi.string(),
    title: Joi.string().required(),
    author: Joi.string().required(),
    price: Joi.number().required()
  })
  return schema.validate(payload)
}
