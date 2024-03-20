import { DataSource, DeepPartial } from 'typeorm'
import { Seeder } from 'typeorm-extension'

import { NewsCategoryEntity } from 'src/modules/main/entities/news-category.entity'

const DAY = 24 * 60 * 60 * 1000

export class Category1710864281366 implements Seeder {
  track = false

  async run(dataSource: DataSource): Promise<void> {
    const createdAt = new Date(Date.now() - 7 * DAY)

    const repository = dataSource.getRepository(NewsCategoryEntity)

    const newsCategoriesPartial: DeepPartial<NewsCategoryEntity>[] = [
      {
        createdAt,
        content: [
          {
            title: 'Science',
            language: 'en',
          },
          {
            title: 'Наука',
            language: 'uk',
          },
        ],
      },
      {
        createdAt,
        published: true,
        publishedAt: new Date(Date.now() - 5 * DAY),
        content: [
          {
            title: 'Ecology',
            language: 'en',
          },
          {
            title: 'Екологія',
            language: 'uk',
          },
        ],
      },
      {
        createdAt,
        published: true,
        publishedAt: new Date(Date.now() - 4 * DAY),
        content: [
          {
            title: 'Culture',
            language: 'en',
          },
          {
            title: 'Культура',
            language: 'uk',
          },
        ],
      },
      {
        createdAt,
        published: true,
        publishedAt: new Date(Date.now() - 3 * DAY),
        content: [
          {
            title: 'Showbiz',
            language: 'en',
          },
          {
            title: 'Шоу-бізнес',
            language: 'uk',
          },
        ],
      },
    ]

    await repository.delete({})

    for (const newsCategoryPartial of newsCategoriesPartial) {
      const newsCategory = repository.create(newsCategoryPartial)

      await repository.save(newsCategory)
    }
  }
}
