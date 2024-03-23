import { Injectable } from '@nestjs/common'

import { AppealToItemById } from 'src/modules/main/interfaces/appeal'

import { AppealEntity } from 'src/modules/main/entities/appeal.entity'

@Injectable()
export class AppealDataMapper {
  appealGetById(entity: AppealEntity): AppealToItemById {
    return entity
  }
}
