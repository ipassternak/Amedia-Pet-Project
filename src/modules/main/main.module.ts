import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { NewsCategoryController } from './controllers/news-category.controller'
import { NewsCategoryService } from './services/news-category.service'

import { NewsCategoryContentEntity } from 'src/modules/main/entities/news-category-content.entity'
import { NewsCategoryEntity } from 'src/modules/main/entities/news-category.entity'
import { NewsContentEntity } from 'src/modules/main/entities/news-content.entity'
import { NewsEntity } from 'src/modules/main/entities/news.entity'
import { ProjectEntity } from 'src/modules/main/entities/project.entity'

import { NewsController } from 'src/modules/main/controllers/news.controller'

import { NewsService } from 'src/modules/main/services/news.service'

import { NewsCategoryDataMapper } from 'src/modules/main/data-mappers/news-category.data-mappers'
import { NewsDataMapper } from 'src/modules/main/data-mappers/news.data-mapper'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProjectEntity,
      NewsEntity,
      NewsContentEntity,
      NewsCategoryEntity,
      NewsCategoryContentEntity,
    ]),
  ],
  controllers: [NewsController, NewsCategoryController],
  providers: [NewsCategoryDataMapper, NewsDataMapper, NewsService, NewsCategoryService],
})
export class MainModule {}
