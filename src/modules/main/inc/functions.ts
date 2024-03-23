import { BadRequestException } from '@nestjs/common'

import { TIME, UNIX_EPOCH } from 'src/core/inc/constants'
import { calcYearOffset } from 'src/core/inc/functions'

import { IPN } from 'src/modules/main/interfaces/appeal'

const IS_IPN_RX = /^[0-9]{10}$/
const BIRTHDAY_PART_BOUNDARIES = [0, 5]
const ID_PART_BOUNDARIES = [5, 9]
const BIRTHDAY_OFFSET = new Date(1899, 11, 31)
const UNIX_BIRTHDAY_DAYS_OFFSET = Math.floor((UNIX_EPOCH.getTime() - BIRTHDAY_OFFSET.getTime()) / TIME.DAYS)

const validateIPNChecksum = (code: string): boolean => {
  const digits = code.split('').map((v) => parseInt(v, 10))
  const [a, b, c, d, e, f, g, h, i, control] = digits
  const checksum = ((a * -1 + b * 5 + c * 7 + d * 9 + e * 4 + f * 6 + g * 10 + h * 5 + i * 7) % 11) % 10

  return checksum === control
}

export const toIPN = (code: string): IPN => {
  if (!code || !IS_IPN_RX.test(code) || !validateIPNChecksum(code)) {
    throw new BadRequestException('IPN is invalid')
  }

  const birthdayPart = code.slice(...BIRTHDAY_PART_BOUNDARIES)
  const birthdayDaysDelta = parseInt(birthdayPart, 10)
  const birthday = new Date((birthdayDaysDelta - UNIX_BIRTHDAY_DAYS_OFFSET) * TIME.DAYS)
  const age = calcYearOffset(birthday)
  const idPart = code.slice(...ID_PART_BOUNDARIES)
  const id = parseInt(idPart, 10)
  const isMale = id % 2 !== 0

  return { id, age, birthday, isMale, code: parseInt(code, 10) }
}
