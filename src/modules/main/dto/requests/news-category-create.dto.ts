import { Type } from 'class-transformer'
import { ArrayNotEmpty, IsArray, ValidateNested } from 'class-validator'

import { TranslationListDto } from 'src/modules/main/dto/requests/translation-list.dto'

export class NewsCategoryCreateDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => TranslationListDto)
  translationList: TranslationListDto[]
}
