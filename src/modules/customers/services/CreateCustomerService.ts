import { Customer } from '../entities/Customer'
import { CustomersRepository } from '../repositories/CustomersRepository'
import AppError from '@errors/AppError'

interface ICreateCustomer {
  name: string
  birth_date: string
  cpf: string
  email: string
  phone: string
}

export class CreateCustomerService {
  public async execute({
    name,
    birth_date,
    cpf,
    email,
    phone
  }: ICreateCustomer): Promise<Customer> {
    const ifEmailExists =
      await CustomersRepository.findByEmailAndCheckIfExcludedIsNull(email)

    if (ifEmailExists) {
      throw new AppError('Email already exists and the customer is active.')
    }

    const ifCpfExists =
      await CustomersRepository.findByCpfAndCheckIfExcludedIsNull(cpf)

    if (ifCpfExists) {
      throw new AppError('Cpf already exists and the customer is active.')
    }

    const customer = CustomersRepository.create({
      name,
      birth_date,
      cpf,
      email,
      phone
    })

    await CustomersRepository.save(customer)
    return customer
  }
}
