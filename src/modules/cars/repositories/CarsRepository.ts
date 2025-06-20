import { dataSource } from '@database/data-source'
import { Car } from '@cars/entities/Car'
import { ISearchParams, ICarPaginate } from '@cars/interfaces/CarInterfaces'

export const CarsRepository = dataSource.getRepository(Car).extend({
  async deleteCar(id: string) {
    return this.createQueryBuilder('cars')
      .update('cars')
      .set({ status: 'excluded' })
      .where('cars.id = :id', { id })
      .execute()
  },

  async findByModel(model: string) {
    return this.createQueryBuilder('cars')
      .where('cars.model = :model', { model })
      .getMany()
  },

  async findByBrand(brand: string) {
    return this.createQueryBuilder('cars')
      .where('cars.brand = :brand', { brand })
      .getMany()
  },

  async findByPlate(license_plate: string) {
    return this.createQueryBuilder('cars')
      .where('cars.license_plate = :license_plate', { license_plate })
      .getMany()
  },

  async findByID(id: string) {
    return this.createQueryBuilder('cars')
      .where('cars.id = :id', { id })
      .getOne()
  },

  async findAll({
    skip,
    limit,
    filters = {}
  }: ISearchParams): Promise<ICarPaginate> {
    const query = this.createQueryBuilder('cars').skip(skip).take(limit)
    Number(filters.yearMin)
    Number(filters.yearMax)
    Number(filters.kmMin)
    Number(filters.kmMax)
    Number(filters.priceMin)
    Number(filters.priceMax)

    const filterConditions: { [key in keyof typeof filters]?: string } = {
      model: 'cars.model = :model',
      brand: 'cars.brand = :brand',
      status: 'cars.status = :status',
      plate: 'cars.license_plate = :plate',
      yearMin: 'cars.year >= :yearMin',
      yearMax: 'cars.year <= :yearMax',
      kmMin: 'cars.km >= :kmMin',
      kmMax: 'cars.km <= :kmMax',
      priceMin: 'cars.price >= :priceMin',
      priceMax: 'cars.price <= :priceMax'
    }

    Object.keys(filters).forEach((key) => {
      const condition = filterConditions[key]
      if (condition) {
        query.andWhere(condition, { [key]: filters[key] })
      }
    })

    if (filters.items && filters.items.length > 0) {
      query.andWhere('cars.items && ARRAY[:...items]', { items: filters.items })
    }

    if (filters.orderBy) {
      const orderBy = [filters.orderBy]
      orderBy.forEach((orderOptions: string) => {
        const [field, order] = orderOptions.split(':')
        query.addOrderBy(
          `cars.${field}`,
          (order?.toUpperCase() as 'ASC' | 'DESC') || 'ASC'
        )
      })
    }

    const [cars, count] = await query.getManyAndCount()

    return {
      total: count,
      total_pages: Math.ceil(count / limit),
      limit: limit,
      data: cars
    }
  }
})
