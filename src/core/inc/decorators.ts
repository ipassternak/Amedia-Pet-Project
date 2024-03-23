import { Transform } from 'class-transformer'

export const EmptyToUndefined = (): PropertyDecorator =>
  Transform(({ value }: { value?: string }): string | undefined => {
    const res = value?.trim()

    return res ? res : undefined
  })

export const ToDate = (): PropertyDecorator => Transform(({ value }): Date => (value ? new Date(value) : undefined))

export const ToInt = (): PropertyDecorator =>
  Transform(({ value }): number => (value ? parseInt(value, 10) : undefined))
