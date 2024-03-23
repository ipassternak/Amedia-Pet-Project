import { Type } from 'class-transformer'
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator'

import { ToDate } from 'src/core/inc/decorators'

import { NewsTranslationWithMetadataDto } from 'src/modules/main/dto/helpers/translations.dto'
import { NewsCategoryUpdateDto } from 'src/modules/main/dto/requests/news-category-update.dto'

export class NewsUpdateDto {
  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  slug: string

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => NewsTranslationWithMetadataDto)
  translationList: NewsTranslationWithMetadataDto[]

  @IsOptional()
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => NewsCategoryUpdateDto)
  newsCategory?: NewsCategoryUpdateDto

  @ToDate()
  @IsDate()
  publishedAt: Date

  @ToDate()
  @IsDate()
  createdAt: Date

  @IsBoolean()
  isPublished: boolean

  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  title: string

  @IsString()
  @MaxLength(2000)
  @IsNotEmpty()
  description: string
}
