import { Transform, Type } from 'class-transformer'
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

import { ContentDataDto } from 'src/modules/main/dto/requests/content-data.dto'
import { MetaDataDto } from 'src/modules/main/dto/requests/metadata.dto'

export class TranslationDto {
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
  thumbnailUrl: string
}

export class TranslationWithoutDescriptionDto {
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
  thumbnailUrl: string
}

export class NewsTranslationDto extends TranslationDto {
  @IsUUID()
  translationId: string
}

export class NewsTranslationWithMetadataDto extends NewsTranslationDto {
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => ContentDataDto)
  contentData: ContentDataDto

  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => MetaDataDto)
  metaData: MetaDataDto
}

export class NewsCategoryTranslationDto {
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

export class NewsCategoryUpdateDto {
  @IsUUID()
  id: string

  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => NewsCategoryTranslationDto)
  translationList: NewsCategoryTranslationDto[]

  @IsDate()
  @Transform(({ value }) => new Date(value))
  publishedAt: Date

  @IsDate()
  @Transform(({ value }) => new Date(value))
  createdAt: Date

  @IsBoolean()
  isPublished: boolean
}
