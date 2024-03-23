import { Type } from 'class-transformer'
import { IsArray, IsBoolean, IsDate, IsNotEmpty, IsUUID, ValidateNested } from 'class-validator'

import { GenericDto } from 'src/core/abstracts/generic.dto'
import { ToDate } from 'src/core/inc/decorators'

import { NewsCategoryTranslationDto } from 'src/modules/main/dto/helpers/translations.dto'

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
