import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { And, FindOptionsWhere, ILike, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm'

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
    const { category, searchTerm, publishedBefore, publishedAfter } = query

    const where: FindOptionsWhere<ArticleEntity> = {
      published: true,
      category: category && {
        names: {
          name: ILike(`%${category}%`),
        },
      },
      content: searchTerm && [
        {
          title: ILike(`%${searchTerm}%`),
        },
        {
          description: ILike(`%${searchTerm}%`),
        },
      ],
    }

    if (publishedBefore && publishedAfter) {
      where.publishedAt = And(LessThanOrEqual(new Date(publishedAfter)), MoreThanOrEqual(new Date(publishedBefore)))
    } else if (publishedBefore) {
      where.publishedAt = LessThanOrEqual(new Date(publishedBefore))
    } else if (publishedAfter) {
      where.publishedAt = MoreThanOrEqual(new Date(publishedAfter))
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
