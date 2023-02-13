import { Application, Router } from 'express'
import { courseRouter } from './Course/course.route'
import { healthRouter } from './health.route'
import { roleRouter } from './Role/role.route'
import { userRouter } from './User/user.route'

const _routes: Array<[string, Router]> = [
  ['/health', healthRouter],
  ['/course', courseRouter],
  ['/role', roleRouter],
  ['/user', userRouter]
]

export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, router] = route
    app.use(url, router)
  })
}
