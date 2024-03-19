import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { ArticleContentEntity } from 'src/modules/main/entities/article-content.entity'
import { CategoryEntity } from 'src/modules/main/entities/category.entity'

@Entity('article')
export class ArticleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true, name: 'category_id' })
  categoryId: string

  @ManyToOne(() => CategoryEntity, (category) => category.articles, { onDelete: 'SET NULL', cascade: true })
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity

  @Column({ default: false })
  published: boolean

  @Column({ nullable: true, name: 'published_at' })
  publishedAt: Date

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @OneToMany(() => ArticleContentEntity, (articleContent) => articleContent.articleId, { cascade: true })
  content: ArticleContentEntity[]
}
