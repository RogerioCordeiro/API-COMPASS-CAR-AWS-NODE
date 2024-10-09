import AppError from '../../../errors/AppError'
import { CarsRepository } from '../repositories/CarsRepository'

interface ICreateCar {
  license_plate: string
  brand: string
  model: string
  km: number
  year: number
  price: number
  items: string[]
}

export class CreateCarsService {
  public async execute({
    license_plate,
    brand,
    model,
    km,
    year,
    price,
    items
  }: ICreateCar): Promise<ICreateCar | AppError> {
    const carAlreadyExists = await CarsRepository.findByPlate(license_plate)
    if (carAlreadyExists && carAlreadyExists.status === 'ativo') {
      return new AppError('Car already exists', 409)
    }

    const car = CarsRepository.create({
      license_plate,
      brand,
      model,
      km,
      year,
      price,
      items
    })

    await CarsRepository.save(car)
    return car
  }
}
