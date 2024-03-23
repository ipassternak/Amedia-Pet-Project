export enum NewsCategorySortFields {
  ID = 'id',
  TITLE = 'title',
  PUBLISHED_AT = 'publishedAt',
  CREATED_AT = 'createdAt',
}

export interface NewsCategoryContentToTranslation {
  translationId: string
  lang: string
  title: string
}

export interface NewsCategoryToListItem {
  id: string
  title: string
  publishedAt: Date
  createdAt: Date
  isPublished: boolean
}

export interface NewsCategoryToItemById {
  id: string
  translationList: NewsCategoryContentToTranslation[]
  publishedAt: Date
  createdAt: Date
  isPublished: boolean
}
