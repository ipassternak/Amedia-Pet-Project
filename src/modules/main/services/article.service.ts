import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { ArticleToItemById, ArticleToListItem } from 'src/modules/main/interfaces/article'

import { ArticleEntity } from 'src/modules/main/entities/article.entity'

import { ArticleDataMapper } from 'src/modules/main/data-mappers/article.data-mapper'

@Injectable()
export class ArticleService {
  constructor(
    private readonly articleDataMapper: ArticleDataMapper,
    @InjectRepository(ArticleEntity) private articleRepository: Repository<ArticleEntity>,
  ) {}

  async getList(): Promise<{ data: ArticleToListItem[] }> {
    const articleList = await this.articleRepository.find({
      where: {
        published: true,
      },
      relations: {
        content: true,
      },
    })

    return { data: articleList.map((article) => this.articleDataMapper.articleToSearchResult(article)) }
  }

  async getItemById(id: string): Promise<{ data: ArticleToItemById }> {
    const foundItem = await this.articleRepository.findOne({
      where: {
        id,
        published: true,
      },
      relations: {
        content: true,
      },
    })

    if (foundItem) {
      return { data: this.articleDataMapper.articleGetById(foundItem) }
    } else {
      throw new NotFoundException()
    }
  }
}
