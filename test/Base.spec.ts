import { expect, test, describe } from 'vitest'
import { Observable } from 'rxjs'
import { Base, PayloadAction, Runtime, StreamerMethod, filterAction, reduceFromPayload } from '../src'

class TestDuck extends Base {
  get quickTypes() {
    enum Type {
      INNER_SET,
      OUTER_SET,
    }
    return {
      ...Type,
    }
  }
  get reducers() {
    const { types } = this;
    return {
      inner: reduceFromPayload<Record<string, string>>(types.INNER_SET, {})
    }
  }
  @StreamerMethod()
  method(action$: Observable<PayloadAction>) {
    const { types, dispatch } = this;
    return action$
      .pipe(filterAction([types.OUTER_SET]))
      .subscribe(action => {
        dispatch({
          type: types.INNER_SET,
          payload: action.payload,
        })
      })
  }
}

describe('Base', () => {
  test.concurrent('dispatch', async () => {
    const { duck } = Runtime.create(TestDuck)
    const { getState, dispatch, types } = duck
    expect(getState().inner).toStrictEqual({})
    dispatch({
      type: types.INNER_SET,
      payload: { name: 'test' }
    })
    expect(getState().inner).toStrictEqual({ name: 'test' })
  })
  test.concurrent('StreamerMethod', async () => {
    const { duck } = Runtime.create(TestDuck)
    const { getState, dispatch, types } = duck
    expect(getState().inner).toStrictEqual({})
    dispatch({
      type: types.OUTER_SET,
      payload: { name: 'test' }
    })
    expect(getState().inner).toStrictEqual({ name: 'test' })
  })
})