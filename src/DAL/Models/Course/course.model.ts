import { PojosMetadataMap } from '@automapper/pojos'
import mongoose from 'mongoose'
import BaseSchema from '../base.model'

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      default: 0
    },
    ...BaseSchema.obj
  },
  { timestamps: true }
)

const Course = mongoose.model<CourseModel>('Course', courseSchema)

export default Course

export interface CourseModel {
  _id?: string

  title?: string

  author?: string

  price?: number
}

export interface CourseDto {
  id?: string

  title?: string

  author?: string

  price?: number
}

export function createCourseMetadata() {
  PojosMetadataMap.create<CourseModel>('CourseModel', {
    _id: String,
    title: String,
    author: String,
    price: Number
  })

  PojosMetadataMap.create<CourseDto>('CourseDto', {
    id: String,
    title: String,
    author: String,
    price: Number
  })
}
