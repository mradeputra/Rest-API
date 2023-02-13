import mongoose from 'mongoose'
import BaseSchema from '../base.model'
import { PojosMetadataMap } from '@automapper/pojos'
import bcrypt from 'bcryptjs'

const HASH_ROUNDS: number = 10

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, index: { unique: true } },
    name: { type: String, required: true },
    password: { type: String, required: true },
    roleId: { type: String, required: true },
    ...BaseSchema.obj
  },
  { timestamps: true }
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  try {
    const salt = await bcrypt.genSalt(HASH_ROUNDS)
    this.password = await bcrypt.hash(this.password, salt)
  } catch (error) {
    return next()
  }
})

userSchema.methods.validatePassword = function (password: string) {
  return bcrypt.compareSync(password, this.password)
}

const User = mongoose.model<UserModel>('User', userSchema)

export default User

export interface UserModel {
  _id?: string

  email?: string

  name?: string

  password?: string

  roleId?: string

  validatePassword(password: string): boolean
}

export interface UserDto {
  userId?: string

  email?: string

  name?: string

  roleId?: string
}

export interface UserPayloadDto {
  id?: string

  email?: string

  name?: string

  password?: string

  roleType?: string
}

export interface UserLoginPayloadDto {
  email: string

  password: string

  refreshToken?: string
}

export function createUserMetadata() {
  PojosMetadataMap.create<UserModel>('UserModel', {
    _id: String,

    email: String,

    name: String,

    password: String,

    roleId: String
  })

  PojosMetadataMap.create<UserDto>('UserDto', {
    userId: String,

    email: String,

    name: String,

    roleId: String
  })

  PojosMetadataMap.create<UserPayloadDto>('UserPayloadDto', {
    id: String,

    email: String,

    name: String,

    password: String,

    roleType: String
  })
}
