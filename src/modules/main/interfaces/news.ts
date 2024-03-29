import { NewsCategoryToItemById, NewsCategoryToListItem } from 'src/modules/main/interfaces/news-category'

export enum NewsSortFields {
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
  contentData: { htmlText: string }
  metaData: Record<string, string>
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
  newsCategory: NewsCategoryToItemById
  publishedAt: Date
  createdAt: Date
  isPublished: boolean
}
