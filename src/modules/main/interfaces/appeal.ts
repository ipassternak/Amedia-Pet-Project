export enum AppealType {
  JOIN = 'join',
  REVALIDATION = 'revalidation',
}

export interface IPN {
  id: number
  birthday: Date
  age: number
  isMale: boolean
  code: number
}

export interface AppealToItemById {
  id: number
  email: string
  type: AppealType
  ipn: number
  age: number
  finishedAt: Date
}
