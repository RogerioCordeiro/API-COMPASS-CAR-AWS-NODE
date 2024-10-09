/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import { CreateCarsService } from '../models/cars/services/CreateCarService'
import AppError from '../errors/AppError'

export default class UsersController {
  public async create(req: Request, res: Response): Promise<any> {
    const { license_plate, brand, model, km, year, price, items } = req.body

    const createCar = new CreateCarsService()

    const cars = await createCar.execute({
      license_plate,
      brand,
      model,
      km,
      year,
      price,
      items
    })

    if (cars instanceof AppError) {
      return res.status(cars.statusCode).json({ message: cars.message })
    }

    return res.status(201).json(cars)
  }
}
