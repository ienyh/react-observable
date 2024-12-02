import { Base } from 'observable-duck'
import { reduceFromPayload } from 'observable-duck/helper'

export default class Duck extends Base {
  get quickTypes() {
    enum Type {
      SET_VALUE,
    }
    return {
      ...Type,
    }
  }
  get reducers() {
    const { types } = this
    return {
      aaa: (state: string) => 'init name',
      bbb: (state: number) => Date.now(),
      count: reduceFromPayload<number>(types.SET_VALUE, 0),
    }
  }
}
