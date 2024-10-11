import { dataSource } from '../../../database/data-source'
import { Customer } from '../entities/Customer'

export const CustomersRepository = dataSource.getRepository(Customer).extend({
  findByEmailAndCheckIfExcludedIsNull(email: string) {
    return this.createQueryBuilder('customers')
      .where('customers.email = :email', { email })
      .andWhere('customers.excluded_at IS NULL')
      .getOne()
  },

  findByCpfAndCheckIfExcludedIsNull(cpf: string) {
    return this.createQueryBuilder('customers')
      .where('customers.cpf = :cpf', { cpf })
      .andWhere('customers.excluded_at IS NULL')
      .getOne()
  }
})
