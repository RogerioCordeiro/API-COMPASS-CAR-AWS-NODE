import { Request, Response } from 'express'
import { CreateCustomerService } from 'modules/customers/services/CreateCustomerService'

export default class CustomersController {
  public async create(req: Request, res: Response): Promise<any> {
    const { name, birth_date, cpf, email, phone } = req.body

    const createCustomer = new CreateCustomerService()

    const customer = await createCustomer.execute({
      name,
      birth_date,
      cpf,
      email,
      phone
    })

    return res.status(201).json(customer)
  }
}
