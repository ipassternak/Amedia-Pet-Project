import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import {
  NewsCategorySortFields,
  NewsCategoryToItemById,
  NewsCategoryToListItem,
} from 'src/modules/main/interfaces/news-category'

import { NewsCategoryQueryDto } from 'src/modules/main/dto/queries/news-category.dto'
import { NewsCategoryCreateDto } from 'src/modules/main/dto/requests/news-category-create.dto'
import { NewsCategoryUpdateDto } from 'src/modules/main/dto/requests/news-category-update.dto'

import { NewsCategoryEntity } from 'src/modules/main/entities/news-category.entity'

import { NewsCategoryDataMapper } from 'src/modules/main/data-mappers/news-category.data-mappers'

@Injectable()
export class NewsCategoryService {
  constructor(
    private readonly newsCategoryDataMapper: NewsCategoryDataMapper,
    @InjectRepository(NewsCategoryEntity) private newsCategoryRepository: Repository<NewsCategoryEntity>,
  ) {}

  async getReference(): Promise<{ data: NewsCategoryToItemById[] }> {
    const newsCategoryList = await this.newsCategoryRepository.find({
      where: {
        published: true,
      },
      relations: {
        content: true,
      },
    })

    return {
      data: newsCategoryList.map((newsCategory) => this.newsCategoryDataMapper.newsCategoryGetById(newsCategory)),
    }
  }

  async getList(query: NewsCategoryQueryDto): Promise<{ meta: { total: number }; data: NewsCategoryToListItem[] }> {
    const { sortColumn, sortDirection, page, pageSize } = query

    const listQuery = this.newsCategoryRepository
      .createQueryBuilder('newsCategory')
      .leftJoinAndSelect('newsCategory.content', 'newsCategoryContent')
      .where('newsCategory.published = :published', { published: true })
      .skip((page - 1) * pageSize)
      .take(pageSize)

    if (sortColumn === NewsCategorySortFields.TITLE) {
      listQuery.orderBy('newsCategoryContent.title', sortDirection)
    } else if (sortColumn) {
      listQuery.orderBy(`newsCategory.${sortColumn}`, sortDirection)
    }

    const [newsCategoryList, total] = await listQuery.getManyAndCount()

    return {
      meta: { total },
      data: newsCategoryList.map((newsCategory) =>
        this.newsCategoryDataMapper.newsCategoryToSearchResult(newsCategory),
      ),
    }
  }

  async getItemById(id: string): Promise<{ data: NewsCategoryToItemById }> {
    const foundItem = await this.newsCategoryRepository.findOne({
      where: {
        id,
      },
      relations: {
        content: true,
      },
    })

    if (foundItem) {
      return { data: this.newsCategoryDataMapper.newsCategoryGetById(foundItem) }
    } else {
      throw new NotFoundException()
    }
  }

  async createItem(newsCategoryCreateDto: NewsCategoryCreateDto): Promise<{ data: NewsCategoryToItemById }> {
    for (const { title } of newsCategoryCreateDto.translationList) {
      const foundItem = await this.findItemByTitle(title)

      if (foundItem) {
        return { data: this.newsCategoryDataMapper.newsCategoryGetById(foundItem) }
      }
    }

    const newsCategoryEntity = new NewsCategoryEntity({
      content: newsCategoryCreateDto.translationList.map((translation) => ({
        ...translation,
        language: translation.lang,
      })),
    })

    const item = await this.newsCategoryRepository.save(newsCategoryEntity)

    return { data: this.newsCategoryDataMapper.newsCategoryGetById(item) }
  }

  async updateItemById(
    id: string,
    newsCategoryUpdateDto: NewsCategoryUpdateDto,
  ): Promise<{ data: NewsCategoryToItemById }> {
    const foundItem = await this.newsCategoryRepository.findOne({
      where: {
        id,
      },
      relations: {
        content: true,
      },
    })

    if (!foundItem) {
      throw new NotFoundException()
    }

    const { translationList, publishedAt, createdAt, isPublished } = newsCategoryUpdateDto

    for (const { title } of translationList) {
      const existingItem = await this.findItemByTitle(title)

      if (existingItem && existingItem.id !== id) {
        throw new BadRequestException(`News category with title ${title} already exists`)
      }
    }

    const content = translationList.map((translation) => ({
      id: translation.translationId,
      language: translation.lang,
      title: translation.title,
    }))

    Object.assign(foundItem, { content, publishedAt, createdAt, published: isPublished })

    const item = await this.newsCategoryRepository.save(foundItem)

    return { data: this.newsCategoryDataMapper.newsCategoryGetById(item) }
  }

  async deleteItemById(id: string): Promise<void> {
    await this.getItemById(id)
    await this.newsCategoryRepository.delete({
      id,
    })
  }

  async findItemByTitle(title: string): Promise<NewsCategoryEntity> {
    const q = this.newsCategoryRepository
      .createQueryBuilder('newsCategory')
      .leftJoinAndSelect('newsCategory.content', 'newsCategoryContent')
      .where((qb) => {
        const sq = qb
          .subQuery()
          .select('newsCategory.id')
          .from('category', 'newsCategory')
          .leftJoin('newsCategory.content', 'newsCategoryContent')
          .where('newsCategoryContent.title = :title', { title })
          .take(1)

        return 'newsCategory.id = ' + sq.getQuery()
      })

    return await q.getOne()
  }
}
