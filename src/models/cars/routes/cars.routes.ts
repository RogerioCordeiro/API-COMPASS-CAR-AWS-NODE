import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import CarsController from '@controllers/CarsController'

const carsRouter = Router()
const carsController = new CarsController()

carsRouter.get('/', carsController.index)

carsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  carsController.show
)

carsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      license_plate: Joi.string().required(),
      brand: Joi.string().required(),
      model: Joi.string().required(),
      year: Joi.number().required(),
      km: Joi.number().required(),
      price: Joi.number().required(),
      items: Joi.array().items(Joi.string())
    }
  }),
  carsController.create
)

carsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required()
    }
  }),
  carsController.delete
)

carsRouter.patch('/:id',
  celebrate({
    [Segments.BODY]: {
      license_plate: Joi.string(),
      brand: Joi.string(),
      model: Joi.string(),
      year: Joi.number(),
      km: Joi.number(),
      price: Joi.number(),
      items: Joi.array().items(Joi.string()),
      status: Joi.string().valid('ativo', 'inativo')
    }
  }),
  carsController.update
)
export default carsRouter
