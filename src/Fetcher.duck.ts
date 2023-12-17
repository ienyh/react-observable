import Base from '@/core/Base'
import { PayloadAction } from '@/core/type'
import { createToPayload } from '@/core/util'
import { Streamer } from '@/decorator/method'
import { filterAction } from '@/operator/index'
import { Observable } from 'rxjs'

enum Type {
  FETCH_START,
  FETCH_DONE,
  FETCH_ERROR,
  FETCHING,
  RELOAD,
}
export default abstract class FetcherDuck<TParam = any, TData = any> extends Base {
  actionTypePrefix = 'Fetcher/'
  get quickTypes() {
    return {
      ...super.quickTypes,
      ...Type,
    }
  }
  get reducers() {
    const types = this.types
    return {
      data: (data: TData = null, action: PayloadAction) => {
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
      error: (state: Error = null, action: PayloadAction) => {
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
      loading: (state = false, action: PayloadAction) => {
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

  @Streamer()
  fetch(action$: Observable<PayloadAction>) {
    const duck = this
    const { types, dispatch } = duck
    return action$.pipe(filterAction(types.FETCH_START)).subscribe((action) => {
      duck.param = action.payload
      duck
        .getData(duck.param)
        .then((result) => dispatch({ type: types.FETCH_DONE, payload: result }))
        .catch((error) => dispatch({ type: types.FETCH_ERROR, payload: error }))
    })
  }

  abstract Param
  abstract Result
  param: TParam = null
  abstract getData(param: TParam): Promise<TData>
}
