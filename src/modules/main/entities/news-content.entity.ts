import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm'

import { NewsEntity } from 'src/modules/main/entities/news.entity'

@Entity('article_content')
@Unique(['newsId', 'language'])
export class NewsContentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ length: 100 })
  title: string

  @Column({ length: 2000 })
  description: string

  @Column({ length: 255, name: 'thumbnail_url' })
  thumbnailUrl: string

  @Column({ length: 5 })
  language: string

  @ManyToOne(() => NewsEntity, (news) => news.content, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'article_id' })
  newsId: NewsEntity
}
