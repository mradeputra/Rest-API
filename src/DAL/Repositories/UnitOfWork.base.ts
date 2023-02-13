import { IBaseRepository } from './BaseRepository.interface'
import { BaseRepository } from './BaseRepository.base'
import { IUnitOfWork } from './UnitOfWork.interface'
import Course, { CourseModel } from '../Models/Course/course.model'
import User, { UserModel } from '../Models/User/user.model'
import Role, { RoleModel } from '../Models/Role/role.model'

export class CourseRepository extends BaseRepository<CourseModel> {
  constructor() {
    super(Course)
  }
}

export class UserRepository extends BaseRepository<UserModel> {
  constructor() {
    super(User)
  }
}

export class RoleRepository extends BaseRepository<RoleModel> {
  constructor() {
    super(Role)
  }
}

export default class UnitOfWork implements IUnitOfWork {
  CourseRepository: IBaseRepository<CourseModel>
  UserRepository: IBaseRepository<UserModel>
  RoleRepository: IBaseRepository<RoleModel>

  constructor() {
    this.CourseRepository = new CourseRepository()
    this.UserRepository = new UserRepository()
    this.RoleRepository = new RoleRepository()
  }
}
