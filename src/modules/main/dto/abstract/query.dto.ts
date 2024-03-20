import { Transform } from 'class-transformer'
import { IsEnum, IsNumber, IsOptional } from 'class-validator'

export enum SortedDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export abstract class QueryDto<T> {
  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  page: number

  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  pageSize: number

  @IsOptional()
  @IsEnum(SortedDirection)
  @Transform(({ value }) => (value ? value.trim() : undefined))
  sortDirection?: SortedDirection

  @IsOptional()
  @Transform(({ value }) => (value ? value.trim() : undefined))
  sortColumn?: T
}