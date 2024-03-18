import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { ArticleContentEntity } from 'src/modules/main/entities/article-content.entity'

@Entity('article')
export class ArticleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ default: false })
  published: boolean

  @Column({ nullable: true, name: 'published_at' })
  publishedAt: Date

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @OneToMany(() => ArticleContentEntity, (articleContent) => articleContent.articleId, { cascade: true })
  content: ArticleContentEntity[]
}
