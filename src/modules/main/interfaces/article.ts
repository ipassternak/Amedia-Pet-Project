export interface CategoryNameToItem {
  name: string
  language: string
}

export interface CategoryToItemById {
  id: string
  names: CategoryNameToItem[]
}

export interface ArticleContenToItem {
  title: string
  description: string
  language: string
}

export interface ArticleToListItem {
  id: string
  content: ArticleContenToItem[]
  category: CategoryToItemById | null
  publishedAt: Date
}

export interface ArticleToItemById {
  id: string
  content: ArticleContenToItem[]
  category: CategoryToItemById | null
  publishedAt: Date
}
