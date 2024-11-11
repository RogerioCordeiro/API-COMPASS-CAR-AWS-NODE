import { Request, Response } from 'express'
import { CreateCarsService } from '@cars/services/CreateCarService'
import { ShowCarService } from '@cars/services/ShowCarService'
import { ListCarService } from '@cars/services/ListCarsService'
import { DeleteCarService } from '@cars/services/DeleteCarService'
import { UpdateCarService } from '@cars/services/UpdateCarService'

export default class CarsController {
  public async create(req: Request, res: Response): Promise<string | any> {
    const createCar = new CreateCarsService()
    const carId = await createCar.execute(req.body)
    return res.status(201).json({ carId })
  }

  public async index(req: Request, res: Response): Promise<string | any> {
    const { page = 1, limit = 10, ...filters } = req.query
    const listCar = new ListCarService()
    const cars = await listCar.execute({
      page: Number(page),
      limit: Number(limit),
      filters
    })
    return res.status(200).json(cars)
  }

  public async show(req: Request, res: Response): Promise<string | any> {
    const { id } = req.params
    const car = await new ShowCarService().execute({ id })
    return res.status(200).json(car)
  }

  public async update(req: Request, res: Response): Promise<string | any> {
    const { id } = req.params
    const updateCar = new UpdateCarService()
    const car = await updateCar.execute({ id, ...req.body })
    return res.status(204).send()
  }

  public async delete(req: Request, res: Response): Promise<string | any> {
    const { id } = req.params
    await new DeleteCarService().execute(id)
    return res.status(204).send()
  }
}
