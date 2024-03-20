import { Injectable } from '@nestjs/common'

import {
  NewsCategoryContentToTranslation,
  NewsCategoryToItemById,
  NewsCategoryToListItem,
} from 'src/modules/main/interfaces/news-category'

import { NewsCategoryContentEntity } from 'src/modules/main/entities/news-category-content.entity'
import { NewsCategoryEntity } from 'src/modules/main/entities/news-category.entity'

@Injectable()
export class NewsCategoryDataMapper {
  private newsCategoryContentToTitle(content: NewsCategoryContentEntity[]): string {
    const [{ title }] = content

    return title
  }

  private newsCategoryContentToTranslation(content: NewsCategoryContentEntity): NewsCategoryContentToTranslation {
    const { id, language, title } = content

    return {
      translationId: id,
      lang: language,
      title,
    }
  }

  newsCategoryToSearchResult(entity: NewsCategoryEntity): NewsCategoryToListItem {
    const { id, publishedAt, createdAt, content, published } = entity

    return {
      id,
      title: this.newsCategoryContentToTitle(content),
      publishedAt,
      createdAt,
      isPublished: published,
    }
  }

  newsCategoryGetById(entity: NewsCategoryEntity): NewsCategoryToItemById {
    const { id, createdAt, publishedAt, content, published } = entity

    return {
      id,
      translationList: content.map(this.newsCategoryContentToTranslation),
      publishedAt,
      createdAt,
      isPublished: published,
    }
  }
}
