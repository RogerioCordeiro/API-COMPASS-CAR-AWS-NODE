import 'reflect-metadata'
import 'express-async-errors'
import cors from 'cors'
import express, { Request, Response, NextFunction } from 'express'
import { errors } from 'celebrate'
import { Router } from 'express'
import AppError from '@errors/AppError'
import carsRouter from 'modules/cars/routes/cars.routes'
import customersRouter from 'modules/customers/routes/CustomersRoutes'

export const app = express()
const routes = Router()

app.use(express.json())
app.use(cors())

routes.use('/cars', carsRouter)
routes.use('/customers', customersRouter)

app.use(routes)

app.use(errors())

app.use(
  (error: Error, _req: Request, res: Response, next: NextFunction): any => {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        status: 'error',
        message: error.message
      })
    } else {
      return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      })
    }
  }
)
