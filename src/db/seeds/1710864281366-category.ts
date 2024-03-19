import { DataSource, DeepPartial } from 'typeorm'
import { Seeder } from 'typeorm-extension'

import { CategoryEntity } from 'src/modules/main/entities/category.entity'

const DAY = 24 * 60 * 60 * 1000

export class Category1710864281366 implements Seeder {
  track = false

  async run(dataSource: DataSource): Promise<void> {
    const createdAt = new Date(Date.now() - 7 * DAY)

    const repository = dataSource.getRepository(CategoryEntity)

    const categoriesPartial: DeepPartial<CategoryEntity>[] = [
      {
        createdAt,
        names: [
          {
            name: 'Science',
            language: 'en',
          },
          {
            name: 'Наука',
            language: 'uk',
          },
        ],
      },
      {
        createdAt,
        names: [
          {
            name: 'Ecology',
            language: 'en',
          },
          {
            name: 'Екологія',
            language: 'uk',
          },
        ],
      },
      {
        createdAt,
        names: [
          {
            name: 'Culture',
            language: 'en',
          },
          {
            name: 'Культура',
            language: 'uk',
          },
        ],
      },
      {
        createdAt,
        names: [
          {
            name: 'Showbiz',
            language: 'en',
          },
          {
            name: 'Шоу-бізнес',
            language: 'uk',
          },
        ],
      },
    ]

    await repository.delete({})

    for (const categoryPartial of categoriesPartial) {
      const article = repository.create(categoryPartial)

      await repository.save(article)
    }

    await dataSource.query(``)
  }
}
