import { plainToClassFromExist } from 'class-transformer'

import { TIME } from 'src/core/inc/constants'

export function constructDto<T>(classObject: T, initData: unknown): T {
  return plainToClassFromExist(classObject, initData, {
    strategy: 'excludeAll',
  })
}

export const calcYearOffset = (a: Date, b?: Date): number =>
  Math.floor((b?.getTime() ?? Date.now() - a.getTime()) / TIME.YEARS)
