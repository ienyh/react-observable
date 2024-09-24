import { expect, test, describe } from 'vitest'
import { Observable } from 'rxjs'
import { Base, PayloadAction, Runtime } from '@/core'
import { Action } from '@/decorator'
import { reduceFromPayload } from '@/helper'
import { take } from '@/operator'

describe('SubDuck', () => {
  class Container extends Base {
    get quickDucks() {
      return {
        ...super.quickDucks,
        sub: Sub,
      }
    }
    @Action
    accept(action$: Observable<PayloadAction>) {
      const { ducks } = this
      return action$.pipe(take(ducks.sub.types.SET_VALUE)).subscribe((action) => {
        // 父 duck 可以处子 duck 的 action
        expect(action.type).toBe(ducks.sub.types.SET_VALUE)
      })
    }
  }
  class Sub extends Base {
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
        value: reduceFromPayload<string>(types.SET_VALUE, ''),
      }
    }
    @Action
    accept(action$: Observable<PayloadAction>) {
      const { types } = this
      return action$.subscribe((action) => {
        // 子 duck 仅处理自己的 action
        expect(action.type).toBe(types.SET_VALUE)
      })
    }
  }

  test.concurrent('sub', async () => {
    const { duck } = Runtime.create(Container)
    const { ducks, dispatch } = duck
    dispatch({
      type: ducks.sub.types.SET_VALUE,
      payload: '1',
    })
    dispatch({
      type: ducks.sub.types.SET_VALUE,
      payload: '2',
    })
    dispatch({
      type: ducks.sub.types.SET_VALUE,
      payload: '3',
    })
  })
})
