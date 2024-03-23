import { IsDate, IsEmail, IsEnum, IsNumber, Validate } from 'class-validator'
import { ToIPN } from 'src/modules/main/inc/decorators'
import { AppealAgeValidator, AppealFinishedAtValidator } from 'src/modules/main/inc/validators'

import { GenericDto } from 'src/core/abstracts/generic.dto'
import { ToDate, ToInt } from 'src/core/inc/decorators'

import { AppealType, IPN } from 'src/modules/main/interfaces/appeal'

export class AppealCreateDto extends GenericDto {
  @IsEmail()
  email: string

  @IsEnum(AppealType)
  type: AppealType

  @ToDate()
  @IsDate()
  @Validate(AppealFinishedAtValidator)
  finishedAt: Date

  @ToIPN()
  ipn: IPN

  @ToInt()
  @IsNumber()
  @Validate(AppealAgeValidator)
  age: number
}
