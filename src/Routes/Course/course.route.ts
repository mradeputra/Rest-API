import { Router } from 'express'
import permit from '../../Middleware/auth'
import {
  CountCourse,
  CreateCourse,
  DeleteCourse,
  GetCourse,
  GetCourses,
  UpdateCourse
} from '../../Controllers/Course/course.controller'
export const courseRouter: Router = Router()

courseRouter.get('/', permit('Admin', 'Student', 'Lecturer'), GetCourses)
courseRouter.get('/count', permit('Admin', 'Lecturer'), CountCourse)
courseRouter.get('/:id', permit('Admin', 'Student', 'Lecturer'), GetCourse)
courseRouter.delete('/delete/:id', permit('Admin', 'Lecturer'), DeleteCourse)
courseRouter.post('/insert', permit('Admin', 'Lecturer'), CreateCourse)
courseRouter.put('/update', permit('Admin', 'Lecturer'), UpdateCourse)
