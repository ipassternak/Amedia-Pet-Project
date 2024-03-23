import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AppealEntity } from 'src/modules/main/entities/appeal.entity'
import { NewsCategoryContentEntity } from 'src/modules/main/entities/news-category-content.entity'
import { NewsCategoryEntity } from 'src/modules/main/entities/news-category.entity'
import { NewsContentEntity } from 'src/modules/main/entities/news-content.entity'
import { NewsEntity } from 'src/modules/main/entities/news.entity'

import { AppealController } from 'src/modules/main/controllers/appeal.controller'
import { NewsCategoryController } from 'src/modules/main/controllers/news-category.controller'
import { NewsController } from 'src/modules/main/controllers/news.controller'

import { AppealService } from 'src/modules/main/services/appeal.service'
import { NewsCategoryService } from 'src/modules/main/services/news-category.service'
import { NewsService } from 'src/modules/main/services/news.service'

import { AppealDataMapper } from 'src/modules/main/data-mappers/appeal.data-mapper'
import { NewsCategoryDataMapper } from 'src/modules/main/data-mappers/news-category.data-mapper'
import { NewsDataMapper } from 'src/modules/main/data-mappers/news.data-mapper'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      NewsEntity,
      NewsContentEntity,
      NewsCategoryEntity,
      NewsCategoryContentEntity,
      AppealEntity,
    ]),
  ],
  controllers: [NewsController, NewsCategoryController, AppealController],
  providers: [
    NewsCategoryDataMapper,
    NewsDataMapper,
    NewsService,
    NewsCategoryService,
    AppealService,
    AppealDataMapper,
  ],
})
export class MainModule {}
