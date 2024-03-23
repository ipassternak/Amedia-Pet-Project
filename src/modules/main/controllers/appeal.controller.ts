import { Body, Controller, Post } from '@nestjs/common'

import { AppealToItemById } from 'src/modules/main/interfaces/appeal'

import { AppealCreateDto } from 'src/modules/main/dto/requests/appeal-create.dto'

import { AppealService } from 'src/modules/main/services/appeal.service'

@Controller('appeal')
export class AppealController {
  constructor(private readonly appealService: AppealService) {}

  @Post('create')
  async create(@Body() appealCreateDto: AppealCreateDto): Promise<{ data: AppealToItemById }> {
    return await this.appealService.create(appealCreateDto)
  }
}
