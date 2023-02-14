import UnitOfWork from '../../DAL/Repositories/UnitOfWork.base'
import { CourseDto, CourseModel, createCourseMetadata } from '../../DAL/Models/Course/course.model'
import { createMap, forMember, mapFrom } from '@automapper/core'
import { mapper } from '../../Utils/mapper'

const uow = new UnitOfWork()
createCourseMetadata()

createMap<CourseDto, CourseModel>(
  mapper,
  'CourseDto',
  'CourseModel',
  forMember(
    (dest) => dest._id,
    mapFrom((src) => src.id)
  )
)
createMap<CourseModel, CourseDto>(
  mapper,
  'CourseModel',
  'CourseDto',
  forMember(
    (dest) => dest.id,
    mapFrom((src) => src._id)
  )
)

export default class CourseLogic {
  /**
   * GetCoursesAsync
   */
  public async GetCoursesAsync() {
    const courses = await uow.CourseRepository.GetAsync()
    return mapper.mapArray(courses, 'CourseModel', 'CourseDto')
  }

  /**
   * GetCourseByIdAsync
   */
  public async GetCourseByIdAsync(id: string) {
    const result = await uow.CourseRepository.GetByIdAsync(id)
    return mapper.map(result, 'CourseModel', 'CourseDto')
  }

  /**
   * CreateCourseAsync
   */
  public async CreateCourseAsync(dto: CourseDto) {
    const course: CourseModel = mapper.map(dto, 'CourseDto', 'CourseModel')
    const result = await uow.CourseRepository.CreateAsync(course)
    return mapper.map(result, 'CourseModel', 'CourseDto')
  }

  /**
   * DeleteCourseAsync
   */
  public async DeleteCourseAsync(id: string) {
    const result = await uow.CourseRepository.DeleteAsync(id)
    return result
  }

  /**
   * UpdateCourseAsync
   */
  public async UpdateCourseAsync(dto: CourseDto) {
    const course: CourseModel = mapper.map(dto, 'CourseDto', 'CourseModel')
    const result = await uow.CourseRepository.UpdateAsync(dto.id ?? '', course)
    return result
  }

  /**
   * CountCourseAsync
   */
  public async CountCourseAsync() {
    const authorFilter = { author: 'putra' }
    const courseCount = await uow.CourseRepository.CountAsync(authorFilter)
    return courseCount
  }
}
