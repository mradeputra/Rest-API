import { Router } from 'express'
import permit from '../../Middleware/auth'
import CourseController from '../../Controllers/Course/course.controller'

export const courseRouter: Router = Router()
const controller = new CourseController()

courseRouter.get('/', permit('Admin', 'Student', 'Lecturer'), controller.GetCourses())
courseRouter.get('/count', permit('Admin', 'Lecturer'), controller.CountCourse())
courseRouter.get('/:id', permit('Admin', 'Student', 'Lecturer'), controller.GetCourse())
courseRouter.delete('/delete/:id', permit('Admin', 'Lecturer'), controller.DeleteCourse())
courseRouter.post('/insert', permit('Admin', 'Lecturer'), controller.CreateCourse())
courseRouter.put('/update', permit('Admin', 'Lecturer'), controller.UpdateCourse())
