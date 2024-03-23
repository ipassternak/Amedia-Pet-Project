import { Transform } from 'class-transformer'
import { IsEnum, IsNumber, IsOptional } from 'class-validator'

import { GenericDto } from 'src/core/abstracts/generic.dto'
import { ToInt } from 'src/core/inc/decorators'
import { SortDirection } from 'src/core/interfaces/query'

export abstract class QueryDto<T> extends GenericDto {
  @ToInt()
  @IsNumber()
  page: number

  @ToInt()
  @IsNumber()
  pageSize: number

  @IsOptional()
  @IsEnum(SortDirection)
  @Transform(({ value }) => (value ? value.trim() : undefined))
  sortDirection?: SortDirection

  @IsOptional()
  @Transform(({ value }) => (value ? value.trim() : undefined))
  sortColumn?: T
}
