import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsOrder, Repository } from 'typeorm'

import { NewsCategoryToItemById, NewsCategoryToListItem } from 'src/modules/main/interfaces/news-category'

import { NewsCategoryQueryDto } from 'src/modules/main/dto/queries/news-category.dto'

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

    const order: FindOptionsOrder<NewsCategoryEntity> = {}

    if (sortColumn === 'title') {
      order.content = { title: sortDirection }
    } else if (sortColumn) {
      order[sortColumn] = sortDirection
    }

    const newsCategoryList = await this.newsCategoryRepository.find({
      where: {
        published: true,
        content: true,
      },
      relations: {
        content: true,
      },
      order,
      skip: (page - 1) * pageSize,
      take: pageSize,
    })

    return {
      meta: {
        total: newsCategoryList.length,
      },
      data: newsCategoryList.map((newsCategory) =>
        this.newsCategoryDataMapper.newsCategoryToSearchResult(newsCategory),
      ),
    }
  }

  async getItemById(id: string): Promise<{ data: NewsCategoryToItemById }> {
    const foundItem = await this.newsCategoryRepository.findOne({
      where: {
        id,
        published: true,
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

  async deleteItemById(id: string): Promise<void> {
    await this.getItemById(id)
    await this.newsCategoryRepository.delete({
      id,
    })
  }
}
