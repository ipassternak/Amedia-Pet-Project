import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import {
  And,
  FindOptionsOrder,
  FindOptionsWhere,
  ILike,
  IsNull,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm'

import { NewsToItemById, NewsToListItem } from 'src/modules/main/interfaces/news'

import { NewsQueryDto } from 'src/modules/main/dto/queries/news.dto'

import { NewsEntity } from 'src/modules/main/entities/news.entity'

import { NewsDataMapper } from 'src/modules/main/data-mappers/news.data-mapper'

@Injectable()
export class NewsService {
  constructor(
    private readonly newsDataMapper: NewsDataMapper,
    @InjectRepository(NewsEntity) private newsRepository: Repository<NewsEntity>,
  ) {}

  async getList(query: NewsQueryDto): Promise<{ meta: { total: number }; data: NewsToListItem[] }> {
    const {
      newsCategory,
      searchTerm,
      publishedBefore,
      publishedAfter,
      lang,
      sortColumn,
      sortDirection,
      page,
      pageSize,
    } = query

    const where: FindOptionsWhere<NewsEntity> = {
      published: true,
      newsCategory: [
        {
          content: {
            title: newsCategory && ILike(`%${newsCategory}%`),
            language: lang,
          },
        },
        {
          content: {
            title: IsNull(),
          },
        },
      ],
      content: [
        {
          title: searchTerm && ILike(`%${searchTerm}%`),
          language: lang,
        },
        {
          description: searchTerm && ILike(`%${searchTerm}%`),
          language: lang,
        },
      ],
    }

    if (publishedBefore && publishedAfter) {
      where.publishedAt = And(LessThanOrEqual(new Date(publishedBefore)), MoreThanOrEqual(new Date(publishedAfter)))
    } else if (publishedBefore) {
      where.publishedAt = LessThanOrEqual(new Date(publishedBefore))
    } else if (publishedAfter) {
      where.publishedAt = MoreThanOrEqual(new Date(publishedAfter))
    }

    const order: FindOptionsOrder<NewsEntity> = {}

    if (sortColumn === 'title') {
      order.content = { title: sortDirection }
    } else if (sortColumn === 'newsCategory') {
      order.newsCategory = { content: { title: sortDirection } }
    } else if (sortColumn) {
      order[sortColumn] = sortDirection
    }

    const newsList = await this.newsRepository.find({
      where,
      relations: {
        content: true,
        newsCategory: {
          content: true,
        },
      },
      order,
      skip: (page - 1) * pageSize,
      take: pageSize,
    })

    return {
      meta: { total: newsList.length },
      data: newsList.map((news) => this.newsDataMapper.newsToSearchResult(news)),
    }
  }

  async getItemById(id: string): Promise<{ data: NewsToItemById }> {
    const foundItem = await this.newsRepository.findOne({
      where: {
        id,
        published: true,
      },
      relations: {
        content: true,
        newsCategory: {
          content: true,
        },
      },
    })
    if (foundItem) {
      return { data: this.newsDataMapper.newsGetById(foundItem) }
    } else {
      throw new NotFoundException()
    }
  }

  async deleteItemById(id: string): Promise<void> {
    await this.getItemById(id)
    await this.newsRepository.delete({
      id,
    })
  }
}
