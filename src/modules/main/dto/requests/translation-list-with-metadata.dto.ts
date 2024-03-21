import { Transform, Type } from 'class-transformer'
import { IsArray, IsNotEmpty, IsNotEmptyObject, IsObject, IsString, ValidateNested } from 'class-validator'

import { TranslationListDto } from 'src/modules/main/dto/requests/translation-list.dto'

export class MetaDataDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  description: string

  @IsArray()
  @Transform(({ value }) => value.split(', ').map((keyword: string) => keyword.trim()))
  keywords: string[]

  @IsString()
  @IsNotEmpty()
  ogTitle: string

  @IsString()
  @IsNotEmpty()
  ogDescription: string

  @IsString()
  @IsNotEmpty()
  ogImageUrl: string
}

export class ContentDataDto {
  @IsString()
  @IsNotEmpty()
  htmlText: string
}

export class TranslationListWithMetadataDto extends TranslationListDto {
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
