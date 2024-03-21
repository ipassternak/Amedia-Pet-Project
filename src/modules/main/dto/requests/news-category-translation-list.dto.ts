import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

export class NewsCategoryTranslationListDto {
  @IsUUID()
  translationId: string

  @IsString()
  @IsNotEmpty()
  lang: string

  @IsString()
  @IsNotEmpty()
  title: string
}
