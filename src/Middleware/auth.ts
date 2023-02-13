/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { Request, Response, NextFunction } from 'express'
import { CustomResponse } from '../Utils/exceptions'
import UnitOfWork from '../DAL/Repositories/UnitOfWork.base'

const uow = new UnitOfWork()

/**
 * This function is used to require a certain user type in order to access a certain route.
 * If all checks pass, it calls next() to move on to the next middleware in line.
 * @param roleType The role type to check
 * @returns 401 Unauthorized response If either the user or the role is not found.
 * @returns 403 Forbidden response if the role name does not match with the required roleType.
 *
 */

export default function permit(...roleTypes: string[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user
    const role = await uow.RoleRepository.GetByIdAsync(user.roleId)
    if (!user || !role) {
      return res.status(401).json(CustomResponse(401, false))
    }

    if (!roleTypes.includes(role.name)) {
      return res.status(403).json(CustomResponse(403, false))
    }

    return next()
  }
}
