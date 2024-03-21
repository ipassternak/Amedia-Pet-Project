import { Type } from 'class-transformer'
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator'

import { TranslationListDto } from 'src/modules/main/dto/requests/translation-list.dto'

export class NewsCreateDto {
  @IsString()
  @IsNotEmpty()
  slug: string

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => TranslationListDto)
  translationList: TranslationListDto[]
}
