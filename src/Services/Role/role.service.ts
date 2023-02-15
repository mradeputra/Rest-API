import UnitOfWork from '../../DAL/Repositories/UnitOfWork.base'
import { createRoleMetadata, RoleDto, RoleModel } from '../../DAL/Models/Role/role.model'
import { mapper } from '../../Utils/mapper'
import { createMap, forMember, mapFrom } from '@automapper/core'

const uow = new UnitOfWork()
createRoleMetadata()

createMap<RoleDto, RoleModel>(
  mapper,
  'RoleDto',
  'RoleModel',
  forMember(
    (dest) => dest._id,
    mapFrom((src) => src.id)
  )
)

createMap<RoleModel, RoleDto>(
  mapper,
  'RoleModel',
  'RoleDto',
  forMember(
    (dest) => dest.id,
    mapFrom((src) => src._id)
  )
)

export default class RoleLogic {
  /**
   * CreateRoleo
   */
  public async CreateRole(dto: RoleDto) {
    const role: RoleModel = mapper.map<RoleDto, RoleModel>(dto, 'RoleDto', 'RoleModel')
    const result = await uow.RoleRepository.CreateAsync(role)
    return mapper.map(result, 'RoleModel', 'RoleDto')
  }

  /**
   * GetAllRole
   */
  public async GetAllRole() {
    const result = await uow.RoleRepository.GetAsync()
    return mapper.mapArray(result, 'RoleModel', 'RoleDto')
  }
}
