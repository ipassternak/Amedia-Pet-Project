import { Transform } from 'class-transformer'
import { toIPN } from 'src/modules/main/inc/functions'

import { IPN } from 'src/modules/main/interfaces/appeal'

export const ToIPN = (): PropertyDecorator => Transform(({ value }): IPN => toIPN(value))
