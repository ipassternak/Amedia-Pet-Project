import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator'

import { QueryDto } from 'src/core/abstracts/query.dto'
import { EmptyToUndefined } from 'src/core/inc/decorators'

import { NewsSortFields } from 'src/modules/main/interfaces/news'

export class NewsQueryDto extends QueryDto<NewsSortFields> {
  @IsString()
  lang: string

  @IsOptional()
  @EmptyToUndefined()
  @IsString()
  newsCategory?: string

  @IsOptional()
  @EmptyToUndefined()
  @IsString()
  searchTerm?: string

  @IsOptional()
  @IsDateString()
  publishedBefore?: string

  @IsOptional()
  @IsDateString()
  publishedAfter?: string

  @IsOptional()
  @EmptyToUndefined()
  @IsEnum(NewsSortFields)
  sortColumn?: NewsSortFields
}
