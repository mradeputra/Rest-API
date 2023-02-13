import { createMap, forMember, mapFrom } from '@automapper/core'
import {
  createUserMetadata,
  UserDto,
  UserLoginPayloadDto,
  UserModel,
  UserPayloadDto
} from '../../DAL/Models/User/user.model'
import UnitOfWork from '../../DAL/Repositories/UnitOfWork.base'
import { mapper } from '../../Utils/mapper'
import { signJwt, verifyJwt } from '../../Utils/jwt'

const uow = new UnitOfWork()
createUserMetadata()

createMap<UserModel, UserDto>(
  mapper,
  'UserModel',
  'UserDto',
  forMember(
    (dest) => dest.userId,
    mapFrom((src) => src._id)
  )
)

createMap<UserPayloadDto, UserModel>(mapper, 'UserPayloadDto', 'UserModel')

export const RegisterUser = async (dto: UserPayloadDto) => {
  const user: UserModel = mapper.map<UserPayloadDto, UserModel>(dto, 'UserPayloadDto', 'UserModel')
  const roleMatch = (await uow.RoleRepository.GetAsync({ predicate: { name: dto.roleType } })).at(0)
  if (!roleMatch) {
    throw new Error('Role not found')
  }
  user.roleId = roleMatch._id
  const result = await uow.UserRepository.CreateAsync(user)
  return mapper.map(result, 'UserModel', 'UserDto')
}

export const GetAllUser = async () => {
  const result = await uow.UserRepository.GetAsync()
  return mapper.mapArray(result, 'UserModel', 'UserDto')
}

export const LoginUser = async (dto: UserLoginPayloadDto) => {
  const email = dto.email
  const password = dto.password
  const user = (await uow.UserRepository.GetAsync({ predicate: { email }, pageSize: 1 })).at(0)
  if (!user) {
    throw new Error('User not found')
  }
  const userDto = mapper.map(user, 'UserModel', 'UserDto')
  const isValid = user.validatePassword(password)

  if (!isValid) {
    throw new Error('Invalid Password')
  }
  const accessToken = signJwt({ ...userDto }, { expiresIn: '1h' })
  const refreshToken = signJwt({ ...userDto }, { expiresIn: '90d' })
  return { accessToken, refreshToken }
}

export async function refreshAccessToken(token: string) {
  const { decoded }: any = verifyJwt(token)

  if (!decoded) {
    throw new Error('Invalid token')
  }

  const user = await uow.UserRepository.GetByIdAsync(decoded.userId)
  if (!user) {
    throw new Error('User not found')
  }

  const userDto = mapper.map(user, 'UserModel', 'UserDto')
  const accessToken = signJwt({ ...userDto }, { expiresIn: '1h' })

  return accessToken
}
