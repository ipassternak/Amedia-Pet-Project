import { DeepPartial } from 'typeorm'

export abstract class GenericEntity<T> {
  constructor(partial: DeepPartial<T>) {
    Object.assign(this, partial)
  }
}
