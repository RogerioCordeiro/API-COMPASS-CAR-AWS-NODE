import AppError from '@errors/AppError'
import { OrdersRepository } from '@orders/repositories/OrdersRepository'
import { CarsRepository } from '@cars/repositories/CarsRepository'
import { CustomersRepository } from '@customers/repositories/CustomersRepository'
import { ICreateOrder } from '@orders/interfaces/OrdersInterface'
import { feeValues } from '@orders/utils/order.fee'
import { locale } from '@orders/utils/viacep'

export class CreateOrderService {
  public async execute({
    customer_id,
    car_id,
    cep,
    start_date,
    end_date
  }: ICreateOrder): Promise<any> {
    const carOrder = await OrdersRepository.findByCar(car_id)
    carOrder.forEach((order) => {
      if (order.status === 'open' || order.status === 'approved') {
        throw new AppError('car currently rented', 409)
      }
    })

    const customerOrder = await OrdersRepository.findByCustomer(customer_id)
    customerOrder.forEach((order) => {
      if (order.status === 'open' || order.status === 'approved') {
        throw new AppError('customer currently renting a car', 409)
      }
    })

    if (start_date < new Date()) {
      throw new AppError('start date must be greater than current date', 400)
    }

    if (end_date < start_date) {
      throw new AppError('end date must be greater than start date', 400)
    }

    const car = await CarsRepository.findByID(car_id)
    if (!car) {
      throw new AppError('car not found', 404)
    }

    const customer = await CustomersRepository.findByID(customer_id)
    if (!customer) {
      throw new AppError('customer not found', 404)
    }

    const {
      uf,
      localidade
    }: { uf: keyof typeof feeValues; localidade: string } = await locale({
      cep
    })

    const total_value =
      ((end_date.getTime() - start_date.getTime()) / (1000 * 3600 * 24)) *
        car.price +
      feeValues[uf]

    const order = await OrdersRepository.create({
      customer,
      cep,
      city: localidade,
      uf,
      order_fee: feeValues[uf],
      total_value,
      car,
      start_date,
      end_date
    })

    await OrdersRepository.save(order)
    return order
  }
}
