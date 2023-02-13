import { FilterQuery, ProjectionType, QueryOptions } from 'mongoose'

export interface IBaseRepository<T> {
  CreateAsync(item: T): Promise<T | null>
  GetByIdAsync(id: string): Promise<T | null>
  DeleteAsync(id: string): Promise<boolean>
  UpdateAsync(id: string, item: T): Promise<boolean>
  CountAsync(predicate: FilterQuery<T>): Promise<number>
  GetAsync(options?: {
    predicate?: FilterQuery<T>
    pageSize?: number
    selector?: ProjectionType<T>
    orderBy?: QueryOptions<T>
  }): Promise<T[]>
}
