import { Injectable } from '@nestjs/common'

import { ArticleContenToItem, ArticleToItemById, ArticleToListItem } from 'src/modules/main/interfaces/article'

import { ArticleContentEntity } from 'src/modules/main/entities/article-content.entity'
import { ArticleEntity } from 'src/modules/main/entities/article.entity'

@Injectable()
export class ArticleDataMapper {
  articleContentToItem(entity: ArticleContentEntity): ArticleContenToItem {
    const { title, description, language } = entity

    return {
      title,
      description,
      language,
    }
  }

  articleToSearchResult(entity: ArticleEntity): ArticleToListItem {
    const { id, content, publishedAt } = entity

    return {
      id,
      content: content.map((articleContent) => this.articleContentToItem(articleContent)),
      publishedAt,
    }
  }

  articleGetById(entity: ArticleEntity): ArticleToItemById {
    const { id, content, publishedAt } = entity

    return {
      id,
      content: content.map((articleContent) => this.articleContentToItem(articleContent)),
      publishedAt,
    }
  }
}
