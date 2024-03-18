import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ArticleContentEntity } from 'src/modules/main/entities/article-content.entity'
import { ArticleEntity } from 'src/modules/main/entities/article.entity'
import { ProjectEntity } from 'src/modules/main/entities/project.entity'

import { AppController } from 'src/modules/main/controllers/app.controller'
import { ArticleController } from 'src/modules/main/controllers/article.controller'
import { ProjectController } from 'src/modules/main/controllers/project.controller'

import { ArticleService } from 'src/modules/main/services/article.service'
import { ProjectService } from 'src/modules/main/services/project.service'

import { ArticleDataMapper } from 'src/modules/main/data-mappers/article.data-mapper'
import { ProjectDataMapper } from 'src/modules/main/data-mappers/project.data-mapper'

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity, ArticleEntity, ArticleContentEntity]), ScheduleModule.forRoot()],
  controllers: [AppController, ProjectController, ArticleController],
  providers: [ProjectService, ProjectDataMapper, ArticleService, ArticleDataMapper],
})
export class MainModule {}
