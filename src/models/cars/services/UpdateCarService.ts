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
    const minYear = new Date().getFullYear() - 10
    const maxYear = minYear + 11

    const car = await CarsRepository.findByID(id)
    if (!car) {
      throw new AppError('Car not found', 404)
    }

    if(car.status === 'excluido'){
      throw new AppError('Car not found', 404)
    }

    if(year > maxYear || year < minYear){
      throw new AppError(`Car year must be between ${minYear} and ${maxYear}`, 400)
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
