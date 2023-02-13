/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Request, Response } from 'express-serve-static-core'
import { roleValidation } from '../../Validations/role.validation'
import { logger } from '../../Utils/logger'
import { CreateRole, GetAllRole } from '../../Services/Role/role.service'
import { CustomResponse } from '../../Utils/exceptions'

export const CreateRoleController = async (req: Request, res: Response) => {
  try {
    const { error, value } = roleValidation(req.body)
    if (error) {
      logger.error(`Unable to parse request body: ${error.details[0].message}`)
      return res.status(422).send(CustomResponse(422, false, { message: error.details[0].message }))
    }

    const dto = await CreateRole(value)
    logger.info('post role success')
    return res.status(200).send(CustomResponse(200, true, { message: 'Success', data: dto }))
  } catch (error) {
    logger.error(error)
    return res.status(500).send(CustomResponse(500, false, { message: `${error}` }))
  }
}

export const GetAllRoleController = async (req: Request, res: Response) => {
  try {
    const roles = await GetAllRole()
    logger.info('get roles success')
    return res.status(200).send(CustomResponse(200, true, { message: 'Success', data: roles }))
  } catch (error) {
    logger.error(error)
    return res.status(400).send(CustomResponse(400, false, { message: `${error}` }))
  }
}
