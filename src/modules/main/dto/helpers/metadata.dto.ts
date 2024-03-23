import { Transform } from 'class-transformer'
import { IsArray, IsOptional, IsString } from 'class-validator'

import { GenericDto } from 'src/core/abstracts/generic.dto'

export class MetaDataDto extends GenericDto {
  @IsOptional()
  @IsString()
  title?: string

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @Transform(({ value }) => value?.split(', ').map((keyword: string) => keyword.trim()))
  @IsArray()
  keywords?: string[]

  @IsOptional()
  @IsString()
  ogTitle?: string

  @IsOptional()
  @IsString()
  ogDescription?: string

  @IsOptional()
  @IsString()
  ogImageUrl?: string
}
