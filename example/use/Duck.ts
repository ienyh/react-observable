import { Base, reduceFromPayload } from '../../src'

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
      value: reduceFromPayload<string>(types.SET_VALUE, ''),
    }
  }
}
