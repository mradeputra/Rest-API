/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Error, FilterQuery, Model, ProjectionType, QueryOptions } from 'mongoose'
import { IBaseRepository } from './BaseRepository.interface'

export abstract class BaseRepository<T> implements IBaseRepository<T> {
  protected model: Model<T>

  constructor(model: Model<T>) {
    this.model = model
  }

  async CreateAsync(item: T): Promise<T | null> {
    try {
      const result = await this.model.create(item)
      return result
    } catch (error) {
      throw new Error(`Error: ${error}`)
    }
  }

  async GetByIdAsync(id: string): Promise<T | null> {
    try {
      const result = await this.model.findById(id).exec()
      if (!result) return null
      return result
    } catch (error) {
      throw new Error(`Error: ${error}`)
    }
  }

  async DeleteAsync(id: string): Promise<boolean> {
    try {
      const res = await this.model.findByIdAndRemove(id)
      if (!res) return false
      return true
    } catch (error) {
      throw new Error(`Error: ${error}`)
    }
  }

  async UpdateAsync(id: string, item: Partial<T>): Promise<boolean> {
    try {
      const res = await this.model.findByIdAndUpdate(id, item, { new: true, runValidators: true })
      return !!res
    } catch (error) {
      throw new Error(`Error: ${error}`)
    }
  }

  async CountAsync(item: FilterQuery<T>): Promise<number> {
    try {
      const result = await this.model.countDocuments(item).exec()
      return result
    } catch (error) {
      throw new Error(`Error: ${error}`)
    }
  }

  async GetAsync(options?: {
    predicate?: FilterQuery<T>
    pageSize?: number
    selector?: ProjectionType<T>
    orderBy?: QueryOptions<T>
  }): Promise<T[]> {
    try {
      const result = await this.model
        .find(options?.predicate ?? {}, options?.selector, { sort: options?.orderBy, limit: options?.pageSize })
        .exec()
      return result
    } catch (error) {
      throw new Error(`Error ${error}`)
    }
  }
}
