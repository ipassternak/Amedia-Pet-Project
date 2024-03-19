import { CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { ArticleEntity } from 'src/modules/main/entities/article.entity'
import { CategoryNameEntity } from 'src/modules/main/entities/category-name.entity'

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @OneToMany(() => ArticleEntity, (article) => article.categoryId)
  articles: ArticleEntity[]

  @OneToMany(() => CategoryNameEntity, (categoryName) => categoryName.categoryId, { cascade: true })
  names: CategoryNameEntity[]
}
