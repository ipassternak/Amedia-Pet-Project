import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { CategoryEntity } from 'src/modules/main/entities/category.entity'

@Entity('category_name')
export class CategoryNameEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => CategoryEntity, (category) => category.names, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'category_id' })
  categoryId: string

  @Column({ length: 100 })
  name: string

  @Column({ length: 5 })
  language: string
}
