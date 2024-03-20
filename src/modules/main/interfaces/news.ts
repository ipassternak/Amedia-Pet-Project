import { NewsCategoryToListItem } from 'src/modules/main/interfaces/news-category'

export enum NewsSortedFields {
  ID = 'id',
  TITLE = 'title',
  NEWS_CATEGORY = 'newsCategory',
  PUBLISHED_AT = 'publishedAt',
  CREATED_AT = 'createdAt',
}

export interface NewsContentToTranslation {
  translationId: string
  lang: string
  title: string
  description: string
  thumbnailUrl: string
}

export interface NewsToListItem {
  id: string
  slug: string
  title: string
  newsCategory: NewsCategoryToListItem | null
  publishedAt: Date
  createdAt: Date
  isPublished: boolean
}

export interface NewsToItemById {
  id: string
  slug: string
  translationList: NewsContentToTranslation[]
  newsCategory: NewsCategoryToListItem | null
  publishedAt: Date
  createdAt: Date
  isPublished: boolean
}
