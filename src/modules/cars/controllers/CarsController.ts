import { Request, Response } from 'express'
import { CreateCarsService } from 'modules/cars/services/CreateCarService'
import { ShowCarService } from 'modules/cars/services/ShowCarService'
import { ListCarService } from 'modules/cars/services/ListCarsService'
import { DeleteCarService } from 'modules/cars/services/DeleteCarService'
import { UpdateCarService } from 'modules/cars/services/UpdateCarService'



export default class UsersController {
  public async index(req: Request, res: Response): Promise<any> {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const filters = req.query
    const listCar = new ListCarService()
    const cars = await listCar.execute({ page, limit, filters })
    return res.status(200).json(cars)
  }

  public async show(req: Request, res: Response): Promise<any> {
    const { id } = req.params
    const showCar = new ShowCarService()
    const car = await showCar.execute({ id })
    return res.status(200).json(car)
  }

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

    return res.status(201).json(cars)
  }

  public async delete(req: Request, res: Response): Promise<any> {
    const { id } = req.params
    const deleteCar = new DeleteCarService().execute(id)
    return res.status(204).send()
  }

  public async update(req: Request, res: Response): Promise<any> {
    const { license_plate, brand, model, km, year, price, items, status } = req.body
    const { id } = req.params
    const updateCar = new UpdateCarService()

    const car = await updateCar.execute({
      id,
      license_plate,
      brand,
      model,
      km,
      year,
      price,
      items,
      status
    })

    return res.status(201).json(car)
  }
}

