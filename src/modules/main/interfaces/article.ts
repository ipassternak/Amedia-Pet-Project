export interface ArticleContenToItem {
  title: string
  description: string
  language: string
}

export interface ArticleToListItem {
  id: string
  content: ArticleContenToItem[]
  publishedAt: Date
}

export interface ArticleToItemById {
  id: string
  content: ArticleContenToItem[]
  publishedAt: Date
}
