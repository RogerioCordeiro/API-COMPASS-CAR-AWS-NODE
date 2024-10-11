import AppError from '@errors/AppError'
import { CarsRepository } from 'modules/cars/repositories/CarsRepository'

export class DeleteCarService {
  public async execute(id: string): Promise<void> {
    const car = await CarsRepository.findByID(id)
    if (!car) {
      throw new AppError('Car not found', 404)
    }
    await CarsRepository.delete(id)
  }
}
