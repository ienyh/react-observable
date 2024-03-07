import { expect, test, describe } from 'vitest'
import { Observable, Subject } from 'rxjs'
import {
  Base,
  From,
  PayloadAction,
  Runtime,
  StreamerMethod,
  filterAction,
  reduceFromPayload,
} from '../src'

const external$ = new Subject<string>()

class TestDuck extends Base {
  get quickTypes() {
    enum Type {
      INNER_SET,
      OUTER_SET,
      EXTERNAL,
    }
    return {
      ...Type,
    }
  }
  get reducers() {
    const { types } = this
    return {
      inner: reduceFromPayload<Record<string, string>>(types.INNER_SET, {}),
      external: reduceFromPayload<string>(types.EXTERNAL, ''),
    }
  }
  @StreamerMethod()
  method(action$: Observable<PayloadAction>) {
    const { types, dispatch } = this
    return action$.pipe(filterAction([types.OUTER_SET])).subscribe((action) => {
      dispatch({
        type: types.INNER_SET,
        payload: action.payload,
      })
    })
  }

  @From(external$)
  accept(external$: Observable<string>) {
    const { types, dispatch } = this
    return external$.subscribe((value) => {
      dispatch({
        type: types.EXTERNAL,
        payload: value,
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
      payload: { name: 'test' },
    })
    expect(getState().inner).toStrictEqual({ name: 'test' })
  })

  test.concurrent('StreamerMethod', async () => {
    const { duck } = Runtime.create(TestDuck)
    const { getState, dispatch, types } = duck
    expect(getState().inner).toStrictEqual({})
    dispatch({
      type: types.OUTER_SET,
      payload: { name: 'test' },
    })
    expect(getState().inner).toStrictEqual({ name: 'test' })
  })

  test.concurrent('@From() External', async () => {
    const { duck } = Runtime.create(TestDuck)
    const { getState } = duck
    expect(getState().external).toStrictEqual('')
    external$.next('test_1')
    expect(getState().external).toStrictEqual('test_1')
    external$.next('test_2')
    expect(getState().external).toStrictEqual('test_2')
  })
})
