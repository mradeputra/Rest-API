/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Request, Response } from 'express-serve-static-core'
import { logger } from '../../Utils/logger'
import { courseValidation } from '../../Validations/course.validation'
import CourseLogic from '../../Services/Course/course.service'
import HttpObjectResult from '../../Utils/exceptions'

const courseLogic = new CourseLogic()

export default class CourseController {
  /**
   * GetCourses
   */
  public GetCourses() {
    return GetCourses
  }

  /**
   * GetCourse
   */
  public GetCourse() {
    return GetCourse
  }

  /**
   * CreateCourse
   */
  public CreateCourse() {
    return CreateCourse
  }

  /**
   * UpdateCourse
   */
  public UpdateCourse() {
    return UpdateCourse
  }

  /**
   * DeleteCourse
   */
  public DeleteCourse() {
    return DeleteCourse
  }

  /**
   * CountCourse
   */
  public CountCourse() {
    return CountCourse
  }
}

const GetCourses = async (req: Request, res: Response) => {
  try {
    const courses = await courseLogic.GetCoursesAsync()
    logger.info('get courses success')
    return HttpObjectResult(res, 200, true, courses)
  } catch (error) {
    logger.error(error)
    return HttpObjectResult(res, 400, false, null, `${error}`)
  }
}

const GetCourse = async (req: Request, res: Response) => {
  try {
    const {
      params: { id }
    } = req

    const course = await courseLogic.GetCourseByIdAsync(id)

    if (course === null) {
      logger.error('get course not found')
      return HttpObjectResult(res, 404, false, null, 'Course not found')
    }

    if (id) {
      logger.info('get course success')
      return HttpObjectResult(res, 200, true, course)
    }
  } catch (error) {
    logger.error(error)
    return HttpObjectResult(res, 400, false, null, `${error}`)
  }
}

const CreateCourse = async (req: Request, res: Response) => {
  const { error, value } = courseValidation(req.body)
  if (error) {
    logger.error(`Unable to parse request body: ${error.details[0].message}`)
    return HttpObjectResult(res, 422, false, null, error.details[0].message)
  }
  try {
    const dto = await courseLogic.CreateCourseAsync(value)

    logger.info('post course success')
    return HttpObjectResult(res, 201, true, dto)
  } catch (error) {
    logger.error(error)
    return HttpObjectResult(res, 500, false, null, `${error}`)
  }
}

const UpdateCourse = async (req: Request, res: Response) => {
  const { error, value } = courseValidation(req.body)
  if (error) {
    logger.error(`Unable to parse request body: ${error.details[0].message}`)
    return HttpObjectResult(res, 422, false, null, error.details[0].message)
  }
  try {
    const isUpdated = await courseLogic.UpdateCourseAsync(value)
    if (!isUpdated) {
      logger.error('Update course failed')
      return HttpObjectResult(res, 400, false, null, 'update course failed')
    }

    logger.info('Update course success')
    return HttpObjectResult(res, 200, true, value)
  } catch (error) {
    logger.error(error)
    return HttpObjectResult(res, 400, false, null, `${error}`)
  }
}

const DeleteCourse = async (req: Request, res: Response) => {
  const {
    params: { id }
  } = req

  try {
    const isDeleted = await courseLogic.DeleteCourseAsync(id)

    if (!isDeleted) {
      logger.error('delete course failed')
      return HttpObjectResult(res, 400, false, null, 'delete course failed')
    }

    if (id) {
      logger.info('delete course success')
      return HttpObjectResult(res, 202, true, null)
    }
  } catch (error) {
    logger.error(error)
    return HttpObjectResult(res, 500, false, null, `${error}`)
  }
}

const CountCourse = async (req: Request, res: Response) => {
  try {
    const count = await courseLogic.CountCourseAsync()
    return HttpObjectResult(res, 200, true, count)
  } catch (error) {
    logger.error(error)
    return HttpObjectResult(res, 500, false, null, `${error}`)
  }
}
