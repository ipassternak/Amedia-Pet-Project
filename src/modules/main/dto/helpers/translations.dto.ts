import { Type } from 'class-transformer'
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  ValidateNested,
} from 'class-validator'

import { GenericDto } from 'src/core/abstracts/generic.dto'
import { ToDate } from 'src/core/inc/decorators'

import { ContentDataDto } from 'src/modules/main/dto/helpers/content-data.dto'
import { MetaDataDto } from 'src/modules/main/dto/helpers/metadata.dto'

export class TranslationDto extends GenericDto {
  @IsString()
  @MaxLength(5)
  @IsNotEmpty()
  lang: string

  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  title: string

  @IsString()
  @MaxLength(2000)
  @IsNotEmpty()
  description: string

  @IsOptional()
  @MaxLength(255)
  @IsString()
  thumbnailUrl?: string
}

export class TranslationWithoutDescriptionDto extends GenericDto {
  @IsString()
  @MaxLength(5)
  @IsNotEmpty()
  lang: string

  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  title: string

  @IsOptional()
  @MaxLength(255)
  @IsString()
  thumbnailUrl?: string
}

export class NewsTranslationDto extends TranslationDto {
  @IsUUID()
  translationId: string
}

export class NewsTranslationWithMetadataDto extends NewsTranslationDto {
  @IsOptional()
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => ContentDataDto)
  contentData?: ContentDataDto

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => MetaDataDto)
  metaData?: MetaDataDto
}

export class NewsCategoryTranslationDto extends GenericDto {
  @IsUUID()
  translationId: string

  @IsString()
  @MaxLength(5)
  @IsNotEmpty()
  lang: string

  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  title: string
}

export class NewsCategoryUpdateDto extends GenericDto {
  @IsUUID()
  id: string

  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => NewsCategoryTranslationDto)
  translationList: NewsCategoryTranslationDto[]

  @ToDate()
  @IsDate()
  publishedAt: Date

  @ToDate()
  @IsDate()
  createdAt: Date

  @IsBoolean()
  isPublished: boolean
}
