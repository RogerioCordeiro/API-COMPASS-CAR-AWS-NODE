import { Car } from 'modules/cars/entities/Car'

export interface IListParams {
  page: number
  limit: number
  filters?: any
}

export interface ICarPaginate {
  total: number
  total_pages: number
  per_page: number
  data: Car[]
}

export interface ISearchParams {
  page: number
  skip: number
  take: number
  filters?: any
}
