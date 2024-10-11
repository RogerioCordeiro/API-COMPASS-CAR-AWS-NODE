import AppError from '@errors/AppError'
import { CarsRepository } from '@cars/repositories/CarsRepository'

interface IRequest {
  id: string;
  license_plate: string
  brand: string
  model: string
  km: number
  year: number
  price: number
  items: string[]
  status: string
}

export class UpdateCarService {
  public async execute({
    id,
    license_plate,
    brand,
    model,
    km,
    year,
    price,
    items,
    status
  }: IRequest): Promise<any> {
    const car = await CarsRepository.findByID(id)
    if (!car) {
      throw new AppError('Car not found', 404)
    }

    const carAlreadyExists = await CarsRepository.findByPlate(license_plate)

    if(car.status === 'excluido'){
      throw new AppError('Car not found', 404)
    }

    car.license_plate = license_plate;
    car.brand = brand;
    car.model = model;
    car.km = km;
    car.year = year;
    car.price = price;
    car.items = items;
    car.status = status;

    await CarsRepository.save(car)

    return car
  }
}
