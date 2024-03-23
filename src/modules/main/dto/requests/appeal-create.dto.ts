import { IsDate, IsEmail, IsEnum, IsNumber, Validate } from 'class-validator'
import { ToIPN } from 'src/modules/main/inc/decorators'

import { GenericDto } from 'src/core/abstracts/generic.dto'
import { ToDate, ToInt } from 'src/core/inc/decorators'
import { calcYearOffset } from 'src/core/inc/functions'

import { AppealType, IPN } from 'src/modules/main/interfaces/appeal'

const APPEAL_MINIMUM_JOIN_FINSIHED_AT = 1
const APPEAL_MINIMUM_REVALIDATION_FINSIHED_AT = 2

export class AppealDto extends GenericDto {
  @IsEmail()
  email: string

  @IsEnum(AppealType)
  type: AppealType

  @ToDate()
  @IsDate()
  @Validate(
    ({ value, obj }) => {
      const { type } = obj
      const yearOffset = calcYearOffset(value)

      return (
        yearOffset >
        (type === AppealType.JOIN ? APPEAL_MINIMUM_JOIN_FINSIHED_AT : APPEAL_MINIMUM_REVALIDATION_FINSIHED_AT)
      )
    },
    { message: 'Invalid appeal date' },
  )
  finsihedAt: Date

  @ToIPN()
  ipn: IPN

  @ToInt()
  @IsNumber()
  @Validate(({ value, obj }) => obj.ipn.age === value, { message: 'Age does not match IPN' })
  age: number
}
