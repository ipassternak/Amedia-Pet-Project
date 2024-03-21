import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator'

import { NewsSortedFields } from 'src/modules/main/interfaces/news'

import { EmptyToUndefined, QueryDto } from 'src/modules/main/dto/abstract/query.dto'

export class NewsQueryDto extends QueryDto<NewsSortedFields> {
  @IsString()
  lang: string

  @IsOptional()
  @IsString()
  @EmptyToUndefined()
  newsCategory?: string

  @IsOptional()
  @IsString()
  @EmptyToUndefined()
  searchTerm?: string

  @IsOptional()
  @IsDateString()
  publishedBefore?: string

  @IsOptional()
  @IsDateString()
  publishedAfter?: string

  @IsOptional()
  @IsEnum(NewsSortedFields)
  @EmptyToUndefined()
  sortColumn?: NewsSortedFields
}
