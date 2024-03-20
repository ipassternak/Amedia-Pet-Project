import { DataSource, DeepPartial } from 'typeorm'
import { Seeder } from 'typeorm-extension'

import { NewsCategoryEntity } from 'src/modules/main/entities/news-category.entity'
import { NewsEntity } from 'src/modules/main/entities/news.entity'

const DAY = 24 * 60 * 60 * 1000

export class Article1710771710106 implements Seeder {
  track = false

  async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(NewsEntity)

    const [ecology, culture] = await dataSource.getRepository(NewsCategoryEntity).find({
      where: {
        content: [
          {
            title: 'Ecology',
          },
          {
            title: 'Culture',
          },
        ],
      },
      order: {
        createdAt: 'ASC',
      },
    })

    const createdAt = new Date(Date.now() - 5 * DAY)

    const articlesPartial: DeepPartial<NewsEntity>[] = [
      {
        slug: 'climate-change',
        published: true,
        publishedAt: new Date(Date.now() - 3 * DAY),
        newsCategoryId: ecology.id,
        createdAt,
        content: [
          {
            title: 'Climate change',
            description: 'The climate is changing',
            language: 'en',
            thumbnailUrl: 'https://i.imgur.com/Jvh1OQm.jpeg',
          },
          {
            title: 'Зміни клімату',
            description: 'Клімат змінюється',
            language: 'uk',
          },
        ],
      },
      {
        slug: 'recycling',
        newsCategoryId: ecology.id,
        createdAt,
        content: [
          {
            title: 'The importance of recycling',
            description: 'Recycling is important',
            language: 'en',
          },
          {
            title: 'Необходимость переработки мусора',
            description: 'Переработка мусора важна',
            language: 'ru',
          },
        ],
      },
      {
        slug: 'television-stars',
        published: true,
        publishedAt: new Date(Date.now() - 2 * DAY),
        createdAt,
        content: [
          {
            title: 'Зірки телебачення',
            description: 'Відомі люди телебачення',
            language: 'uk',
            thumbnailUrl: 'https://i.imgur.com/Jvh1OQm.jpeg',
          },
          {
            title: 'Television stars',
            description: 'Famous television people',
            language: 'en',
          },
        ],
      },
      {
        slug: 'space-ships',
        createdAt,
        content: [
          {
            title: 'Космические корабли',
            description: 'Космические корабли и их история',
            language: 'ru',
          },
        ],
      },
      {
        slug: 'customs-and-traditions',
        published: true,
        publishedAt: new Date(Date.now() - 1 * DAY),
        newsCategoryId: culture.id,
        createdAt,
        content: [
          {
            title: 'Customs and traditions',
            description: 'Customs and traditions of different countries',
            language: 'en',
          },
          {
            title: 'Традиції та звичаї',
            description: 'Традиції та звичаї різних країн',
            language: 'uk',
            thumbnailUrl: 'https://i.imgur.com/Jvh1OQm.jpeg',
          },
        ],
      },
    ]

    await repository.delete({})

    for (const articlePartial of articlesPartial) {
      const article = repository.create(articlePartial)

      await repository.save(article)
    }
  }
}
