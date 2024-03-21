import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Post, Put, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { NewsCategoryToItemById, NewsCategoryToListItem } from 'src/modules/main/interfaces/news-category'

import { NewsCategoryQueryDto } from 'src/modules/main/dto/queries/news-category.dto'
import { NewsCategoryCreateDto } from 'src/modules/main/dto/requests/news-category-create.dto'
import { NewsCategoryUpdateDto } from 'src/modules/main/dto/requests/news-category-update.dto'

import { NewsCategoryService } from 'src/modules/main/services/news-category.service'

@ApiTags('NewsCategory')
@Controller('news-category')
export class NewsCategoryController {
  constructor(private readonly newsCategoryService: NewsCategoryService) {}

  @Get('reference')
  async getReference(): Promise<{ data: NewsCategoryToItemById[] }> {
    return await this.newsCategoryService.getReference()
  }

  @Get('list')
  async getList(
    @Query() query: NewsCategoryQueryDto,
  ): Promise<{ meta: { total: number }; data: NewsCategoryToListItem[] }> {
    return await this.newsCategoryService.getList(query)
  }

  @Get('item/:id')
  async getItemById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<{ data: NewsCategoryToItemById }> {
    return await this.newsCategoryService.getItemById(id)
  }

  @Post('item')
  async createItem(@Body() newsCategoryCreateDto: NewsCategoryCreateDto): Promise<{ data: NewsCategoryToItemById }> {
    return await this.newsCategoryService.createItem(newsCategoryCreateDto)
  }

  @Put('item/:id')
  async updateItemById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() newsCategoryUpdateDto: NewsCategoryUpdateDto,
  ): Promise<{ data: NewsCategoryToItemById }> {
    return await this.newsCategoryService.updateItemById(id, newsCategoryUpdateDto)
  }

  @Delete('item/:id')
  @HttpCode(204)
  async deleteItemById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): Promise<void> {
    await this.newsCategoryService.deleteItemById(id)
  }
}
