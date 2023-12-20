import Base from '@/core/Base'
import { PayloadAction } from '@/core/type'
import { createToPayload } from '@/core/util'
import { StreamerMethod } from '@/decorator/method'
import { filterAction } from '@/operator/index'
import { Observable } from 'rxjs'

enum Type {
  FETCH_START,
  FETCH_DONE,
  FETCH_ERROR,
  FETCHING,
  RELOAD,
}
export default abstract class FetcherDuck extends Base {

  abstract Param
  abstract Result
  param: this['Param'] = null
  abstract getData(param: this['Param']): Promise<this['Result']>

  get quickTypes() {
    return {
      ...super.quickTypes,
      ...Type,
    }
  }
  get reducers() {
    const types = this.types
    return {
      data: (data = null, action: PayloadAction): this['Result'] => {
        switch (action.type) {
          case types.FETCH_DONE:
            return action.payload
          case types.FETCHING:
          case types.FETCH_START:
          case types.FETCH_ERROR:
            return null
          default:
            return data
        }
      },
      error: (state: Error = null, action: PayloadAction): Error => {
        switch (action.type) {
          case types.FETCH_ERROR:
            return action.payload
          case types.FETCHING:
          case types.FETCH_START:
          case types.FETCH_DONE:
            return null
          default:
            return state
        }
      },
      loading: (state = false, action: PayloadAction): boolean => {
        switch (action.type) {
          case types.FETCHING:
            return action.payload
          case types.FETCH_START:
            return true
          case types.FETCH_DONE:
          case types.FETCH_ERROR:
            return false
          default:
            return state
        }
      },
    }
  }
  get creators() {
    const types = this.types
    return {
      ...super.creators,
      fetch: createToPayload<this['Param']>(types.FETCH_START),
      reload: createToPayload<void>(types.RELOAD),
    }
  }

  @StreamerMethod()
  fetch(action$: Observable<PayloadAction>) {
    const duck = this
    const { types, dispatch } = duck
    return action$.pipe(filterAction([types.FETCH_START, types.RELOAD])).subscribe((action) => {
      if (types.FETCH_START) {
        duck.param = action?.payload
      }
      duck
        .getData(duck.param)
        .then((result) => dispatch({ type: types.FETCH_DONE, payload: result }))
        .catch((error) => dispatch({ type: types.FETCH_ERROR, payload: error }))
    })
  }
}
