/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Request, Response } from 'express-serve-static-core'
import { logger } from '../../Utils/logger'
import { courseValidation } from '../../Validations/course.validation'
import {
  CountCourseAsync,
  CreateCourseAsync,
  DeleteCourseAsync,
  GetCourseAsync,
  GetCourseByIdAsync,
  UpdateCourseAsync
} from '../../Services/Course/course.service'
import { CustomResponse } from '../../Utils/exceptions'

export const GetCourses = async (req: Request, res: Response) => {
  try {
    const courses = await GetCourseAsync()
    logger.info('get courses success')
    return res.status(200).send(CustomResponse(200, true, { data: courses }))
  } catch (error) {
    logger.error(error)
    return res.status(400).send(CustomResponse(400, false, { message: `${error}` }))
  }
}

export const GetCourse = async (req: Request, res: Response) => {
  try {
    const {
      params: { id }
    } = req

    const course = await GetCourseByIdAsync(id)

    if (course === null) {
      logger.error('get course not found')
      return res.status(404).send(CustomResponse(404, false))
    }

    if (id) {
      logger.info('get course success')
      return res.status(200).send(CustomResponse(200, true, { data: course }))
    }
  } catch (error) {
    logger.error(error)
    return res.status(400).send(CustomResponse(400, false, { message: `${error}` }))
  }
}

export const CreateCourse = async (req: Request, res: Response) => {
  const { error, value } = courseValidation(req.body)
  if (error) {
    logger.error(`Unable to parse request body: ${error.details[0].message}`)
    return res.status(422).send(CustomResponse(422, false, { message: error.details[0].message }))
  }
  try {
    const dto = await CreateCourseAsync(value)

    logger.info('post course success')
    return res.status(201).send(CustomResponse(201, true, { data: dto }))
  } catch (error) {
    logger.error(error)
    return res.status(500).send(CustomResponse(500, false, { message: `${error}` }))
  }
}

export const UpdateCourse = async (req: Request, res: Response) => {
  const { error, value } = courseValidation(req.body)
  if (error) {
    logger.error(`Unable to parse request body: ${error.details[0].message}`)
    return res.status(422).send(CustomResponse(422, false, { message: error.details[0].message }))
  }
  try {
    const isUpdated = await UpdateCourseAsync(value)
    if (!isUpdated) {
      logger.error('Update course failed')
      return res.status(400).send(CustomResponse(400, false, { message: 'Update course failed' }))
    }

    logger.info('Update course success')
    return res.status(200).send(CustomResponse(200, true, { data: value }))
  } catch (error) {
    logger.error(error)
    return res.status(400).send(CustomResponse(400, false, { message: `${error}` }))
  }
}

export const DeleteCourse = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req

  try {
    const isDeleted = await DeleteCourseAsync(id)

    if (!isDeleted) {
      logger.error('delete course failed')
      return res.status(400).send(CustomResponse(400, false, { message: 'delete course failed' }))
    }

    if (id) {
      logger.info('delete course success')
      return res.status(202).send(CustomResponse(202, true))
    }
  } catch (error) {
    logger.error(error)
    return res.status(500).send(CustomResponse(500, false, { message: `${error}` }))
  }
}

export const CountCourse = async (req: Request, res: Response) => {
  try {
    const count = await CountCourseAsync()
    return res.status(200).send(CustomResponse(200, true, { data: { count } }))
  } catch (error) {
    logger.error(error)
    return res.status(500).send(CustomResponse(500, false, { message: `${error}` }))
  }
}
