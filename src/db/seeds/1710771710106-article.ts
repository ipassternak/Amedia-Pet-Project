import { DataSource, DeepPartial } from 'typeorm'
import { Seeder } from 'typeorm-extension'

import { ArticleEntity } from 'src/modules/main/entities/article.entity'

const DAY = 24 * 60 * 60 * 1000

export class Article1710771710106 implements Seeder {
  track = false

  async run(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(ArticleEntity)

    const createdAt = new Date(Date.now() - 5 * DAY)

    const articlesPartial: DeepPartial<ArticleEntity>[] = [
      {
        published: true,
        publishedAt: new Date(Date.now() - 3 * DAY),
        createdAt,
        content: [
          {
            title: 'Climate change',
            description: 'The climate is changing',
            language: 'en',
          },
          {
            title: 'Cambio climático',
            description: 'El clima está cambiando',
            language: 'es',
          },
        ],
      },
      {
        published: false,
        publishedAt: null,
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
        published: true,
        publishedAt: new Date(Date.now() - 2 * DAY),
        createdAt,
        content: [
          {
            title: 'Зірки телебачення',
            description: 'Відомі люди телебачення',
            language: 'uk',
          },
          {
            title: 'Television stars',
            description: 'Famous television people',
            language: 'en',
          },
        ],
      },
      {
        published: false,
        publishedAt: null,
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
        published: true,
        publishedAt: new Date(Date.now() - 1 * DAY),
        createdAt,
        content: [
          {
            title: 'Customs and traditions',
            description: 'Customs and traditions of different countries',
            language: 'en',
          },
        ],
      },
    ]

    for (const articlePartial of articlesPartial) {
      const article = repository.create(articlePartial)

      await repository.save(article)
    }
  }
}
