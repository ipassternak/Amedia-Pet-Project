import { Type } from 'class-transformer'
import { ArrayNotEmpty, IsArray, ValidateNested } from 'class-validator'

import { GenericDto } from 'src/core/abstracts/generic.dto'

import { TranslationWithoutDescriptionDto } from 'src/modules/main/dto/helpers/translations.dto'

export class NewsCategoryCreateDto extends GenericDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => TranslationWithoutDescriptionDto)
  translationList: TranslationWithoutDescriptionDto[]
}
