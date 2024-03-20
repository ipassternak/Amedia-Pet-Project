import { Injectable } from '@nestjs/common'

import { NewsContentToTranslation, NewsToItemById, NewsToListItem } from 'src/modules/main/interfaces/news'

import { NewsContentEntity } from 'src/modules/main/entities/news-content.entity'
import { NewsEntity } from 'src/modules/main/entities/news.entity'

import { NewsCategoryDataMapper } from 'src/modules/main/data-mappers/news-category.data-mappers'

@Injectable()
export class NewsDataMapper {
  constructor(private readonly newCategoryDataMapper: NewsCategoryDataMapper) {}

  private newsContentToTitle(content: NewsContentEntity[]): string {
    const [{ title }] = content

    return title
  }

  private newsContentToTranslation(content: NewsContentEntity): NewsContentToTranslation {
    const { id, language, title, description, thumbnailUrl } = content

    return {
      translationId: id,
      lang: language,
      title,
      description,
      thumbnailUrl,
    }
  }

  newsToSearchResult(entity: NewsEntity): NewsToListItem {
    const { id, createdAt, publishedAt, content, newsCategory, published, slug } = entity

    return {
      id,
      slug,
      title: this.newsContentToTitle(content),
      newsCategory: newsCategory ? this.newCategoryDataMapper.newsCategoryToSearchResult(newsCategory) : null,
      publishedAt,
      createdAt,
      isPublished: published,
    }
  }

  newsGetById(entity: NewsEntity): NewsToItemById {
    const { id, createdAt, publishedAt, content, newsCategory, published, slug } = entity

    return {
      id,
      slug,
      translationList: content.map(this.newsContentToTranslation),
      newsCategory: newsCategory ? this.newCategoryDataMapper.newsCategoryToSearchResult(newsCategory) : null,
      publishedAt,
      createdAt,
      isPublished: published,
    }
  }
}
