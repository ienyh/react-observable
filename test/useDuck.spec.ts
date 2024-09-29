import { expect, test, describe } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { Observable } from 'rxjs'
import { Base, PayloadAction } from '@/core'
import { Action } from '@/decorator'
import { take } from '@/operator'
import { reduceFromPayload } from '@/helper'
import { useDuck } from '@/react'

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
    const { types } = this
    return {
      inner: reduceFromPayload<string>(types.INNER_SET, ''),
    }
  }
  @Action
  method(action$: Observable<PayloadAction>) {
    const { types, dispatch } = this
    return action$.pipe(take([types.OUTER_SET])).subscribe((action) => {
      dispatch({
        type: types.INNER_SET,
        payload: action.payload,
      })
    })
  }
}

describe('useDuck', () => {
  test.concurrent('use', async () => {
    const { result } = renderHook(() => useDuck(TestDuck))
    const { dispatch, duck } = result.current
    expect(result.current.store.inner).toBe('')
    act(() => {
      dispatch({ type: duck.types.OUTER_SET, payload: 'value_1' })
    })
    expect(result.current.store.inner).toBe('value_1')
    act(() => {
      dispatch({ type: duck.types.OUTER_SET, payload: 'value_2' })
    })
    expect(result.current.store.inner).toBe('value_2')
  })
})
