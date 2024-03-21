import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { NewsToItemById, NewsToListItem } from 'src/modules/main/interfaces/news'

import { NewsQueryDto } from 'src/modules/main/dto/queries/news.dto'
import { NewsCreateDto } from 'src/modules/main/dto/requests/news-create.dto'
import { NewsUpdateDto } from 'src/modules/main/dto/requests/news-update.dto'

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

  @Post('item')
  async createItem(@Body() newsCreateDto: NewsCreateDto): Promise<{ data: NewsToItemById }> {
    return await this.newsService.createItem(newsCreateDto)
  }

  @Put('item/:id')
  async updateItemById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() newsUpdateDto: NewsUpdateDto,
  ): Promise<{ data: NewsToItemById }> {
    return await this.newsService.updateItemById(id, newsUpdateDto)
  }

  @Delete('item/:id')
  async deleteItemById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): Promise<object> {
    await this.newsService.deleteItemById(id)

    return {}
  }
}
