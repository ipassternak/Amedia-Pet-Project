import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'

export class TranslationListDto {
  @IsUUID()
  translationId: string

  @IsString()
  @IsNotEmpty()
  lang: string

  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  description: string

  @IsOptional()
  @IsString()
  thumbnailUrl: string
}
