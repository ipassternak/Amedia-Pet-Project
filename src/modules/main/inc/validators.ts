import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'

import { calcYearOffset } from 'src/core/inc/functions'

import { AppealType, IPN } from 'src/modules/main/interfaces/appeal'

const APPEAL_MINIMUM_JOIN_FINSIHED_AT = 1
const APPEAL_MINIMUM_REVALIDATION_FINSIHED_AT = 2

@ValidatorConstraint({ name: 'appealFinishedAtValidator', async: false })
export class AppealFinishedAtValidator implements ValidatorConstraintInterface {
  validate(value: Date, args: ValidationArguments): boolean {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const { type } = args.object as { type: AppealType }
    const yearOffset = calcYearOffset(value)

    return (
      yearOffset >=
      (type === AppealType.JOIN ? APPEAL_MINIMUM_JOIN_FINSIHED_AT : APPEAL_MINIMUM_REVALIDATION_FINSIHED_AT)
    )
  }

  defaultMessage(): string {
    return 'Invalid appeal date'
  }
}

@ValidatorConstraint({ name: 'appealAgeValidator', async: false })
export class AppealAgeValidator implements ValidatorConstraintInterface {
  validate(value: number, args: ValidationArguments): boolean {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const { ipn } = args.object as { ipn: IPN }

    return ipn.age === value
  }

  defaultMessage(): string {
    return 'Age does not match IPN'
  }
}
