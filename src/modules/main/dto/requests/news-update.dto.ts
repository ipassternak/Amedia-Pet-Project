import { Transform, Type } from 'class-transformer'
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
  ValidateNested,
} from 'class-validator'

import { NewsCategoryUpdateDto } from 'src/modules/main/dto/requests/news-category-update.dto'
import { TranslationListWithMetadataDto } from 'src/modules/main/dto/requests/translation-list-with-metadata.dto'

export class NewsUpdateDto {
  @IsString()
  @IsNotEmpty()
  slug: string

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => TranslationListWithMetadataDto)
  translationList: TranslationListWithMetadataDto[]

  @IsOptional()
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => NewsCategoryUpdateDto)
  newsCategory?: NewsCategoryUpdateDto

  @IsDate()
  @Transform(({ value }) => new Date(value))
  publishedAt: Date

  @IsDate()
  @Transform(({ value }) => new Date(value))
  createdAt: Date

  @IsBoolean()
  isPublished: boolean

  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  description: string
}
