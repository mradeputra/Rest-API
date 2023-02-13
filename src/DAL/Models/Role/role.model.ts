import { PojosMetadataMap } from '@automapper/pojos'
import mongoose from 'mongoose'
import BaseSchema from '../base.model'

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: { unique: true }
    },
    description: {
      type: String,
      required: true
    },
    ...BaseSchema.obj
  },
  { timestamps: true }
)

const Role = mongoose.model<RoleModel>('Role', roleSchema)

export default Role

export interface RoleModel {
  _id: string

  name: string

  description: string
}

export interface RoleDto {
  id?: string

  name?: string

  description?: string
}

export function createRoleMetadata() {
  PojosMetadataMap.create<RoleModel>('RoleModel', {
    _id: String,

    name: String,

    description: String
  })

  PojosMetadataMap.create<RoleDto>('RoleDto', {
    id: String,

    name: String,

    description: String
  })
}
