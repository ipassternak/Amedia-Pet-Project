import { Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { NewsToItemById, NewsToListItem } from 'src/modules/main/interfaces/news'

import { NewsQueryDto } from 'src/modules/main/dto/queries/news.dto'

import { NewsService } from 'src/modules/main/services/news.service'

@ApiTags('News')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('list')
  async getList(@Query() query: NewsQueryDto): Promise<{ meta: { total: number }; data: NewsToListItem[] }> {
    return await this.newsService.getList(query)
  }

  @Get('item/:id')
  async getItemById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): Promise<{ data: NewsToItemById }> {
    return await this.newsService.getItemById(id)
  }

  @Delete('item/:id')
  @HttpCode(204)
  async deleteItemById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): Promise<void> {
    await this.newsService.deleteItemById(id)
  }
}
