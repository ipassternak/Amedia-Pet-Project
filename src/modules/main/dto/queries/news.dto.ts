import { Transform } from 'class-transformer'
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator'

import { NewsSortedFields } from 'src/modules/main/interfaces/news'

import { QueryDto } from 'src/modules/main/dto/abstract/query.dto'

export class NewsQueryDto extends QueryDto<NewsSortedFields> {
  @IsString()
  lang: string

  @IsOptional()
  @IsString()
  newsCategory?: string

  @IsOptional()
  @IsString()
  @Transform(({ value }) => (value ? value.trim() : undefined))
  searchTerm?: string

  @IsOptional()
  @IsDateString()
  publishedBefore?: string

  @IsOptional()
  @IsDateString()
  publishedAfter?: string

  @IsOptional()
  @IsEnum(NewsSortedFields)
  @Transform(({ value }) => (value ? value.trim() : undefined))
  sortColumn?: NewsSortedFields
}
