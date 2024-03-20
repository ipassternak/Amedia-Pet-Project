import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { NewsCategoryEntity } from 'src/modules/main/entities/news-category.entity'
import { NewsContentEntity } from 'src/modules/main/entities/news-content.entity'

@Entity('article')
export class NewsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ length: 100 })
  slug: string

  @Column({ nullable: true, name: 'category_id' })
  newsCategoryId: string

  @Column({ default: false })
  published: boolean

  @Column({ nullable: true, name: 'published_at' })
  publishedAt: Date

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @ManyToOne(() => NewsCategoryEntity, (newsCategory) => newsCategory.news, { onDelete: 'SET NULL', cascade: true })
  @JoinColumn({ name: 'category_id' })
  newsCategory: NewsCategoryEntity

  @OneToMany(() => NewsContentEntity, (newsContent) => newsContent.newsId, { cascade: true })
  content: NewsContentEntity[]
}
