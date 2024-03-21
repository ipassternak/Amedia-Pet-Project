import { IsEnum, IsOptional } from 'class-validator'

import { NewsCategorySortedFields } from 'src/modules/main/interfaces/news-category'

import { EmptyToUndefined, QueryDto } from 'src/modules/main/dto/abstract/query.dto'

export class NewsCategoryQueryDto extends QueryDto<NewsCategorySortedFields> {
  @IsOptional()
  @IsEnum(NewsCategorySortedFields)
  @EmptyToUndefined()
  sortColumn?: NewsCategorySortedFields
}
