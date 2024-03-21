import { Transform, Type } from 'class-transformer'
import { IsArray, IsBoolean, IsDate, IsNotEmpty, IsUUID, ValidateNested } from 'class-validator'

import { NewsCategoryTranslationDto } from 'src/modules/main/dto/requests/translations.dto'

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
