import { Store as ReduxStore, Middleware, legacy_createStore, applyMiddleware, Action } from 'redux'
import { createMiddleware, combineStreamers, StreamMiddleware } from 'redux-observable-action'
import { DuckState, DuckType, PayloadAction } from './type'
import Base, { initialize } from './Base'

export interface DuckStoreOptions {
  prefix?: string
  middlewares?: Middleware[]
}
export default class Store<TDuck extends Base = Base> implements Disposable {
  static create<T extends Base>(Duck: DuckType<T>, options?: DuckStoreOptions) {
    return new Store<T>(Duck, options)
  }

  duck: TDuck
  redux: ReduxStore<DuckState<TDuck>, Action>
  protected middleware: StreamMiddleware<PayloadAction, DuckState<TDuck>>
  protected constructor(Duck: DuckType<TDuck>, options?: DuckStoreOptions) {
    this.duck = new Duck(options?.prefix ?? Duck.name)
    this.initReduxStore(options?.middlewares)
  }

  /**
   * @internal
   */
  protected initReduxStore(extraMiddlewares: Middleware[] = []) {
    const duck = this.duck
    const streamerMiddleware = createMiddleware()
    const store = legacy_createStore(
      duck.combinedReducer,
      applyMiddleware(streamerMiddleware, ...extraMiddlewares)
    )
    duck[initialize](store.getState, store.dispatch)
    streamerMiddleware.run(combineStreamers(...duck.streamers))
    this.redux = store
    this.middleware = streamerMiddleware
  }

  [Symbol.dispose](): void {
    const { duck } = this
    duck[Symbol.dispose]()
    this.middleware.close()
  }
}
