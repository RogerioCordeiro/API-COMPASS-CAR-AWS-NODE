import { dataSource } from '../../../database/data-source'
import { Car } from '../entities/Car'

export const CarsRepository = dataSource.getRepository(Car).extend({
  findByModel(model: string) {
    return this.createQueryBuilder('cars')
      .where('cars.model = :model', { model })
      .getMany()
  },

  findByBrand(brand: string) {
    return this.createQueryBuilder('cars')
      .where('cars.brand = :brand', { brand })
      .getMany()
  }
})
