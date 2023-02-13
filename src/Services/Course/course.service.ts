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

export const GetCourseAsync = async () => {
  const courses = await uow.CourseRepository.GetAsync()
  return mapper.mapArray(courses, 'CourseModel', 'CourseDto')
}

export const GetCourseByIdAsync = async (id: string) => {
  const result = await uow.CourseRepository.GetByIdAsync(id)
  return mapper.map(result, 'CourseModel', 'CourseDto')
}

export const DeleteCourseAsync = async (id: string) => {
  const result = await uow.CourseRepository.DeleteAsync(id)
  return result
}

export const CreateCourseAsync = async (dto: CourseDto) => {
  const course: CourseModel = mapper.map(dto, 'CourseDto', 'CourseModel')
  const result = await uow.CourseRepository.CreateAsync(course)
  return mapper.map(result, 'CourseModel', 'CourseDto')
}

export const UpdateCourseAsync = async (dto: CourseDto) => {
  const course: CourseModel = mapper.map(dto, 'CourseDto', 'CourseModel')
  const result = await uow.CourseRepository.UpdateAsync(dto.id ?? '', course)
  return result
}

export const CountCourseAsync = async () => {
  const authorFilter = { author: 'putra' }
  const courseCount = await uow.CourseRepository.CountAsync(authorFilter)
  return courseCount
}
