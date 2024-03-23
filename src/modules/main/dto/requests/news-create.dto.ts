import { Type } from 'class-transformer'
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString, MaxLength, ValidateNested } from 'class-validator'

import { TranslationDto } from 'src/modules/main/dto/helpers/translations.dto'

export class NewsCreateDto {
  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  slug: string

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => TranslationDto)
  translationList: TranslationDto[]
}
