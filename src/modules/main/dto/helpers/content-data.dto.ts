import { IsString } from 'class-validator'

import { GenericDto } from 'src/core/abstracts/generic.dto'

export class ContentDataDto extends GenericDto {
  @IsString()
  htmlText: string
}
