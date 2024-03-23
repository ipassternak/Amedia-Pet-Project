import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm'

import { GenericEntity } from 'src/core/abstracts/generic.entity'

import { AppealType } from 'src/modules/main/interfaces/appeal'

@Entity('appeal')
@Unique(['email'])
export class AppealEntity extends GenericEntity<AppealEntity> {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column({ length: 255 })
  email: string

  @Column({ type: 'enum', enum: AppealType })
  type: AppealType

  @Column({ type: 'bigint' })
  ipn: number

  @Column({ type: 'integer' })
  age: number

  @Column({ type: 'timestamp', name: 'finished_at' })
  finishedAt: Date
}
