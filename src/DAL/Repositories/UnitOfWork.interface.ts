import { IBaseRepository } from './BaseRepository.interface'
import { CourseModel } from '../Models/Course/course.model'
import { RoleModel } from '../Models/Role/role.model'
import { UserModel } from '../Models/User/user.model'

export interface IUnitOfWork {
  CourseRepository: IBaseRepository<CourseModel>
  UserRepository: IBaseRepository<UserModel>
  RoleRepository: IBaseRepository<RoleModel>
}
