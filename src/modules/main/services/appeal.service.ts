import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { AppealToItemById } from 'src/modules/main/interfaces/appeal'

import { AppealCreateDto } from 'src/modules/main/dto/requests/appeal-create.dto'

import { AppealEntity } from 'src/modules/main/entities/appeal.entity'

import { AppealDataMapper } from 'src/modules/main/data-mappers/appeal.data-mapper'

const MAX_APPEALS = 100

@Injectable()
export class AppealService {
  constructor(
    private readonly appealDataMapper: AppealDataMapper,
    @InjectRepository(AppealEntity) private appealRepository: Repository<AppealEntity>,
  ) {}

  async create(appealCreateDto: AppealCreateDto): Promise<{ data: AppealToItemById }> {
    const foundItem = await this.findAppealByEmail(appealCreateDto.email)

    if (foundItem) {
      throw new BadRequestException('Appeal with this email already exists')
    }

    const count = await this.appealRepository.count()

    if (count >= MAX_APPEALS) {
      throw new BadRequestException('The limit of appeals has been reached')
    }

    const appealEntity = new AppealEntity({
      ...appealCreateDto,
      ipn: appealCreateDto.ipn.code,
    })

    const item = await this.appealRepository.save(appealEntity)

    return { data: this.appealDataMapper.appealGetById(item) }
  }

  async findAppealByEmail(email: string): Promise<AppealEntity> {
    return await this.appealRepository.findOne({ where: { email } })
  }
}
