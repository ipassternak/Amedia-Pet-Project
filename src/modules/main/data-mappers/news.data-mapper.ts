import { Injectable } from '@nestjs/common'

import { NewsContentToTranslation, NewsToItemById, NewsToListItem } from 'src/modules/main/interfaces/news'

import { NewsContentEntity } from 'src/modules/main/entities/news-content.entity'
import { NewsEntity } from 'src/modules/main/entities/news.entity'

import { NewsCategoryDataMapper } from 'src/modules/main/data-mappers/news-category.data-mapper'

interface Options {
  language: string
}

@Injectable()
export class NewsDataMapper {
  constructor(private readonly newsCategoryDataMapper: NewsCategoryDataMapper) {}

  private newsContentToTitle(content: NewsContentEntity[], opts?: Options): string {
    const contentItem = (opts && content.find((c) => c.language === opts.language)) ?? content[0]

    return contentItem?.title ?? ''
  }

  private newsContentToTranslation(content: NewsContentEntity): NewsContentToTranslation {
    const { id, language, title, description, thumbnailUrl, content: htmlText, metadata } = content

    return {
      translationId: id,
      lang: language,
      title,
      description,
      thumbnailUrl,
      contentData: { htmlText },
      metaData: metadata,
    }
  }

  newsToSearchResult(entity: NewsEntity, opts?: Options): NewsToListItem {
    const { id, createdAt, publishedAt, content, newsCategory, published, slug } = entity

    return {
      id,
      slug,
      title: this.newsContentToTitle(content, opts),
      newsCategory: newsCategory ? this.newsCategoryDataMapper.newsCategoryToSearchResult(newsCategory, opts) : null,
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
      newsCategory: newsCategory && this.newsCategoryDataMapper.newsCategoryGetById(newsCategory),
      publishedAt,
      createdAt,
      isPublished: published,
    }
  }
}
