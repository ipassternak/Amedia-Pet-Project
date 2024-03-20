import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { NewsCategoryContentEntity } from 'src/modules/main/entities/news-category-content.entity'
import { NewsEntity } from 'src/modules/main/entities/news.entity'

@Entity('category')
export class NewsCategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ default: false })
  published: boolean

  @Column({ nullable: true, name: 'published_at' })
  publishedAt: Date

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @OneToMany(() => NewsEntity, (news) => news.newsCategoryId)
  news: NewsEntity[]

  @OneToMany(() => NewsCategoryContentEntity, (newsCategoryContent) => newsCategoryContent.newsCategoryId, {
    cascade: true,
  })
  content: NewsCategoryContentEntity[]
}
