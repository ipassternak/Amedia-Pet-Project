import { IsEnum, IsOptional } from 'class-validator'

import { QueryDto } from 'src/core/abstracts/query.dto'
import { EmptyToUndefined } from 'src/core/inc/decorators'

import { NewsCategorySortFields } from 'src/modules/main/interfaces/news-category'

export class NewsCategoryQueryDto extends QueryDto<NewsCategorySortFields> {
  @IsOptional()
  @EmptyToUndefined()
  @IsEnum(NewsCategorySortFields)
  sortColumn?: NewsCategorySortFields
}
