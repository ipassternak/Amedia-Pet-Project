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
  MaxLength,
  ValidateNested,
} from 'class-validator'

import { NewsCategoryUpdateDto } from 'src/modules/main/dto/requests/news-category-update.dto'
import { NewsTranslationWithMetadataDto } from 'src/modules/main/dto/requests/translations.dto'

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

  @IsDate()
  @Transform(({ value }) => new Date(value))
  publishedAt: Date

  @IsDate()
  @Transform(({ value }) => new Date(value))
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
