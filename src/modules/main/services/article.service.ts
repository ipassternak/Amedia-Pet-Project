import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { And, FindOptionsWhere, LessThan, Like, MoreThan, Repository } from 'typeorm'

import { ArticleToItemById, ArticleToListItem } from 'src/modules/main/interfaces/article'

import { ArticleQueryDto } from 'src/modules/main/dto/queries/article.dto'

import { ArticleEntity } from 'src/modules/main/entities/article.entity'

import { ArticleDataMapper } from 'src/modules/main/data-mappers/article.data-mapper'

@Injectable()
export class ArticleService {
  constructor(
    private readonly articleDataMapper: ArticleDataMapper,
    @InjectRepository(ArticleEntity) private articleRepository: Repository<ArticleEntity>,
  ) {}

  async getList(query: ArticleQueryDto): Promise<{ data: ArticleToListItem[] }> {
    const { categoryId, searchTerm, publishedBefore, publishedAfter } = query

    const where: FindOptionsWhere<ArticleEntity> = {
      published: true,
      categoryId,
      content: searchTerm && {
        title: Like(`%${searchTerm}%`),
        description: Like(`%${searchTerm}%`),
      },
    }

    if (publishedBefore && publishedAfter) {
      where.publishedAt = And(LessThan(new Date(publishedAfter)), MoreThan(new Date(publishedBefore)))
    } else if (publishedBefore) {
      where.publishedAt = LessThan(new Date(publishedBefore))
    } else if (publishedAfter) {
      where.publishedAt = MoreThan(new Date(publishedAfter))
    }

    const articleList = await this.articleRepository.find({
      where,
      relations: {
        content: true,
        category: {
          names: true,
        },
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
        category: {
          names: true,
        },
      },
    })

    if (foundItem) {
      return { data: this.articleDataMapper.articleGetById(foundItem) }
    } else {
      throw new NotFoundException()
    }
  }
}
