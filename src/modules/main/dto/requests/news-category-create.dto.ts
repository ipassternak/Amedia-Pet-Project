import { Type } from 'class-transformer'
import { ArrayNotEmpty, IsArray, ValidateNested } from 'class-validator'

import { TranslationWithoutDescriptionDto } from 'src/modules/main/dto/requests/translations.dto'

export class NewsCategoryCreateDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => TranslationWithoutDescriptionDto)
  translationList: TranslationWithoutDescriptionDto[]
}
