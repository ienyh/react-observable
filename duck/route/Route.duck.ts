import Base from '@core/Base'
import { Observable, Subscriber } from 'rxjs'
import { BrowserAdaptor } from './BrowserAdaptor'
import { PayloadAction } from '@core/type'
import { StreamerMethod } from '@decorator/method'
import { filterAction } from '@operator/index'

export interface Adaptor<T = any> {
  watch(): Observable<T>
  preform(state: Observable<T>): void
}
export interface RouteParam<T = any> {
  key: string
  stringify: (param: T) => string
  parse: (param: string) => T
}
export class Route extends Base {
  get param(): Array<RouteParam> {
    return []
  }
  get adaptor(): Adaptor {
    return new BrowserAdaptor()
  }
  constructor(prefix) {
    super(prefix)
    this.adaptor.watch().subscribe((state) => {
      console.log(state)
    })
  }
  get quickTypes() {
    enum Type {
      SET_STATE,
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
      state: (state = null, action: PayloadAction) => {
        switch (action.type) {
          case types.SET_STATE:
            return action.payload
          default:
            return state
        }
      },
    }
  }

  @StreamerMethod()
  set(action$: Observable<PayloadAction>) {
    const { types } = this
    let subscriber: Subscriber<any>
    const $ = new Observable((s) => {
      subscriber = s
    })
    this.adaptor.preform($)
    return action$.pipe(filterAction(types.SET_STATE)).subscribe((action) => {
      if (subscriber && action?.payload) {
        subscriber.next(action.payload)
      }
    })
  }
}
