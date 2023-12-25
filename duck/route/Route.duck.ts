import Base from '@core/Base'
import { Observable, Subject, Subscription } from 'rxjs'
import { BrowserAdaptor } from './BrowserAdaptor'
import { PayloadAction } from '@core/type'
import { StreamerMethod, Cache } from '@decorator/method'
import { filterAction } from '@operator/index'
import { createToPayload } from '@core/helper'

export interface Adaptor<T = any> {
  watch(): Observable<T>
  preform($state: Observable<T>): void
}
export interface RouteParam<T = any> {
  key: string
  stringify: (param: T) => string
  parse: (param: string) => T
}
export class Route extends Base {
  RouteParams: Record<string, any>
  get param(): Array<RouteParam> {
    return []
  }
  @Cache()
  get adaptor(): Adaptor {
    return new BrowserAdaptor()
  }
  [Symbol.dispose]() {
    super[Symbol.dispose]()
    const { subscription } = this
    if (subscription && !subscription.closed) {
      subscription.unsubscribe()
    }
  }
  preform: Subject<this['RouteParams']>
  subscription: Subscription
  init(getState, dispatch) {
    super.init(getState, dispatch)
    const duck = this
    const { types, adaptor } = duck
    this.subscription = adaptor.watch().subscribe((state) => {
      dispatch({
        type: types.SET,
        payload: state,
      })
    })
    const subject = new Subject<this['RouteParams']>()
    adaptor.preform(subject)
    this.preform = subject
  }
  get quickTypes() {
    enum Type {
      SET,
      PUSH,
    }
    return {
      ...super.quickTypes,
      ...Type,
    }
  }
  get reducers() {
    const { types } = this
    return {
      ...super.reducers,
      state: (state = null, action: PayloadAction): this['RouteParams'] => {
        switch (action.type) {
          case types.SET:
            return action.payload
          case types.PUSH: {
            if (!state) {
              return action.payload
            }
            return {
              ...state,
              ...action.payload,
            }
          }
          default:
            return state
        }
      },
    }
  }
  get creators() {
    const { types } = this
    return {
      ...super.creators,
      set: createToPayload<this['RouteParams']>(types.SET),
      push: createToPayload<Partial<this['RouteParams']>>(types.PUSH),
    }
  }

  @StreamerMethod()
  set(action$: Observable<PayloadAction>) {
    const { types, preform, getState } = this
    return action$.pipe(filterAction([types.SET, types.PUSH])).subscribe(() => {
      if (preform) {
        preform.next(getState().state)
      }
    })
  }
}
