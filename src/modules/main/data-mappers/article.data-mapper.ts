import { Injectable } from '@nestjs/common'

import {
  ArticleContenToItem,
  ArticleToItemById,
  ArticleToListItem,
  CategoryNameToItem,
  CategoryToItemById,
} from 'src/modules/main/interfaces/article'

import { ArticleContentEntity } from 'src/modules/main/entities/article-content.entity'
import { ArticleEntity } from 'src/modules/main/entities/article.entity'
import { CategoryNameEntity } from 'src/modules/main/entities/category-name.entity'
import { CategoryEntity } from 'src/modules/main/entities/category.entity'

@Injectable()
export class ArticleDataMapper {
  categoryNameToItem(entity: CategoryNameEntity): CategoryNameToItem {
    const { name, language } = entity

    return {
      name,
      language,
    }
  }

  categoryGetById(entity: CategoryEntity): CategoryToItemById {
    const { id, names } = entity

    return {
      id,
      names: names.map((categoryName) => this.categoryNameToItem(categoryName)),
    }
  }

  articleContentToItem(entity: ArticleContentEntity): ArticleContenToItem {
    const { title, description, language } = entity

    return {
      title,
      description,
      language,
    }
  }

  articleToSearchResult(entity: ArticleEntity): ArticleToListItem {
    const { id, content, publishedAt, category } = entity

    return {
      id,
      content: content.map((articleContent) => this.articleContentToItem(articleContent)),
      category: category ? this.categoryGetById(category) : null,
      publishedAt,
    }
  }

  articleGetById(entity: ArticleEntity): ArticleToItemById {
    const { id, content, publishedAt, category } = entity

    return {
      id,
      content: content.map((articleContent) => this.articleContentToItem(articleContent)),
      category: category ? this.categoryGetById(category) : null,
      publishedAt,
    }
  }
}
