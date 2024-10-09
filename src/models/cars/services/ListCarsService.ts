import AppError from '@errors/AppError'
import { CarsRepository } from '@cars/repositories/CarsRepository'
import { ICarPaginate, IListParams } from '@cars/interfaces/CarInterfaces'

export class ListCarService {
  public async execute({
    page,
    limit,
    filters
  }: IListParams): Promise<ICarPaginate> {
    const take = limit
    const skip = (Number(page) - 1) * take
    const cars = await CarsRepository.findAll({
      page,
      skip,
      take,
      filters
    })

    if (cars.data.length === 0) {
      throw new AppError('Cars not found', 404)
    }

    return cars
  }
}
