import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { ArticleToItemById, ArticleToListItem } from 'src/modules/main/interfaces/article'

import { ArticleService } from 'src/modules/main/services/article.service'

@ApiTags('Article')
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get('list')
  async getList(): Promise<{ data: ArticleToListItem[] }> {
    return await this.articleService.getList()
  }

  @Get('item/:id')
  async getItemById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<{ data: ArticleToItemById }> {
    return await this.articleService.getItemById(id)
  }
}
