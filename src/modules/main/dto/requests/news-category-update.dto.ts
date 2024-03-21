import { Transform, Type } from 'class-transformer'
import { IsArray, IsBoolean, IsDate, IsNotEmpty, IsUUID, ValidateNested } from 'class-validator'

import { NewsCategoryTranslationListDto } from 'src/modules/main/dto/requests/news-category-translation-list.dto'

export class NewsCategoryUpdateDto {
  @IsUUID()
  id: string

  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => NewsCategoryTranslationListDto)
  translationList: NewsCategoryTranslationListDto[]

  @IsDate()
  @Transform(({ value }) => new Date(value))
  publishedAt: Date

  @IsDate()
  @Transform(({ value }) => new Date(value))
  createdAt: Date

  @IsBoolean()
  isPublished: boolean
}
