import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { NewsSortFields, NewsToItemById, NewsToListItem } from 'src/modules/main/interfaces/news'

import { NewsQueryDto } from 'src/modules/main/dto/queries/news.dto'
import { NewsCreateDto } from 'src/modules/main/dto/requests/news-create.dto'
import { NewsUpdateDto } from 'src/modules/main/dto/requests/news-update.dto'

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

    const listQuery = this.newsRepository
      .createQueryBuilder('news')
      .leftJoinAndSelect('news.content', 'newsContent')
      .leftJoinAndSelect('news.newsCategory', 'newsCategory')
      .leftJoinAndSelect('newsCategory.content', 'newsCategoryContent')
      .where((qb) => {
        const sq = qb.subQuery().select('news.id').from('article', 'news').leftJoin('news.content', 'newsContent')

        if (searchTerm) {
          const term = { searchTerm: `%${searchTerm}%` }

          sq.where('newsContent.title ILIKE :searchTerm', term)
          sq.orWhere('newsContent.description ILIKE :searchTerm', term)
        }

        return 'news.id IN ' + sq.getQuery()
      })
      .andWhere('news.published = :published', { published: true })
      .skip((page - 1) * pageSize)
      .take(pageSize)

    if (newsCategory) {
      listQuery.andWhere('newsCategory.id = :newsCategory', { newsCategory })
    }

    if (publishedBefore) {
      listQuery.andWhere('news.publishedAt <= :publishedBefore', { publishedBefore })
    }

    if (publishedAfter) {
      listQuery.andWhere('news.publishedAt >= :publishedAfter', { publishedAfter })
    }

    if (sortColumn === NewsSortFields.TITLE) {
      listQuery.orderBy('newsContent.title', sortDirection)
    } else if (sortColumn === NewsSortFields.NEWS_CATEGORY) {
      listQuery.orderBy('newsCategoryContent.title', sortDirection)
    } else if (sortColumn) {
      listQuery.orderBy(`news.${sortColumn}`, sortDirection)
    }

    const [newsList, total] = await listQuery.getManyAndCount()

    return {
      meta: { total },
      data: newsList.map((news) => this.newsDataMapper.newsToSearchResult(news, { language: lang })),
    }
  }

  async getItemById(id: string): Promise<{ data: NewsToItemById }> {
    const foundItem = await this.newsRepository.findOne({
      where: {
        id,
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

  async createItem(newsCreateDto: NewsCreateDto): Promise<{ data: NewsToItemById }> {
    const foundItem = await this.findItemBySlug(newsCreateDto.slug)

    if (foundItem) {
      throw new BadRequestException('News with this slug already exists')
    }

    const newsEntity = new NewsEntity({
      slug: newsCreateDto.slug,
      content: newsCreateDto.translationList.map((translation) => ({
        ...translation,
        language: translation.lang,
      })),
    })

    const item = await this.newsRepository.save(newsEntity)

    return { data: this.newsDataMapper.newsGetById(item) }
  }

  async updateItemById(id: string, newsUpdateDto: NewsUpdateDto): Promise<{ data: NewsToItemById }> {
    const foundItem = await this.newsRepository.findOne({
      where: {
        id,
      },
    })

    if (!foundItem) {
      throw new NotFoundException()
    }

    const { slug, translationList, publishedAt, createdAt, isPublished, newsCategory } = newsUpdateDto

    const existingItem = await this.findItemBySlug(slug)

    if (existingItem && existingItem.id !== id) {
      throw new BadRequestException(`News with slug ${slug} already exists`)
    }

    const content = translationList.map((translation) => ({
      id: translation.translationId,
      title: translation.title,
      description: translation.description,
      content: translation.contentData.htmlText,
      language: translation.lang,
      metadata: translation.metaData,
      thumbnailUrl: translation.thumbnailUrl,
    }))

    Object.assign(foundItem, {
      slug,
      publishedAt,
      createdAt,
      published: isPublished,
      content,
      newsCategory: newsCategory ? { id: newsCategory.id } : null,
    })

    await this.newsRepository.save(foundItem)

    return await this.getItemById(id)
  }

  async deleteItemById(id: string): Promise<void> {
    await this.getItemById(id)
    await this.newsRepository.delete({
      id,
    })
  }

  async findItemBySlug(slug: string): Promise<NewsEntity> {
    return await this.newsRepository.findOne({
      where: {
        slug,
      },
    })
  }
}
