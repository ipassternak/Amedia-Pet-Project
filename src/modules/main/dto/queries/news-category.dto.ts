import { Transform } from 'class-transformer'
import { IsEnum, IsOptional } from 'class-validator'

import { NewsCategorySortedFields } from 'src/modules/main/interfaces/news-category'

import { QueryDto } from 'src/modules/main/dto/abstract/query.dto'

export class NewsCategoryQueryDto extends QueryDto<NewsCategorySortedFields> {
  @IsOptional()
  @IsEnum(NewsCategorySortedFields)
  @Transform(({ value }) => (value ? value.trim() : undefined))
  sortColumn?: NewsCategorySortedFields
}
