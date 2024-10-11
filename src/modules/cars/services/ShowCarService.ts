import AppError from '@errors/AppError'
import { CarsRepository } from 'modules/cars/repositories/CarsRepository'

interface IRequest {
  id: string
}

export class ShowCarService {
  public async execute({ id }: IRequest): Promise<any> {
    const car = await CarsRepository.findByID(id)
    if (!car) {
      throw new AppError('Car not found', 404)
    }
    return car
  }
}
