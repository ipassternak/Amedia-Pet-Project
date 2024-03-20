import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm'

import { NewsCategoryEntity } from 'src/modules/main/entities/news-category.entity'

@Entity('category_name')
@Unique(['newsCategoryId', 'language'])
export class NewsCategoryContentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => NewsCategoryEntity, (newsCategory) => newsCategory.content, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'category_id' })
  newsCategoryId: string

  @Column({ length: 100, name: 'name' })
  title: string

  @Column({ length: 5 })
  language: string
}
