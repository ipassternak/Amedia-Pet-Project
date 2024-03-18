import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm'

import { ArticleEntity } from 'src/modules/main/entities/article.entity'

@Entity('article_content')
@Unique(['articleId', 'language'])
export class ArticleContentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ length: 100 })
  title: string

  @Column({ length: 2000 })
  description: string

  @Column({ length: 5 })
  language: string

  @ManyToOne(() => ArticleEntity, (article) => article.content, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'article_id' })
  articleId: ArticleEntity
}
