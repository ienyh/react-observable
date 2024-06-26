import * as React from 'react'
import {
  Dispatch,
  Store as ReduxStore,
  Middleware,
  createStore,
  applyMiddleware,
  Action,
} from 'redux'
import { InferableComponentEnhancerWithProps, Provider, connect } from 'react-redux'
import { createMiddleware, combineStreamers, StreamMiddleware } from 'redux-observable-action'
import { ConnectedProps, DuckState, DuckType, PayloadAction } from '..'
import Base, { initialize } from './Base'

export interface DuckRuntimeOptions {
  prefix?: string
  middlewares?: Middleware[]
}
export default class Runtime<TDuck extends Base = Base> implements Disposable {
  static create<T extends Base>(Duck: DuckType<T>, options?: DuckRuntimeOptions) {
    return new Runtime<T>(Duck, options)
  }

  duck: TDuck
  redux: ReduxStore<DuckState<TDuck>, Action>
  protected middleware: StreamMiddleware<PayloadAction, DuckState<TDuck>>
  protected constructor(Duck: DuckType<TDuck>, options?: DuckRuntimeOptions) {
    this.duck = new Duck(options?.prefix ?? Duck.name)
    this.initReduxStore(options?.middlewares)
  }

  protected initReduxStore(extraMiddlewares: Middleware[] = []) {
    const duck = this.duck
    const streamerMiddleware = createMiddleware()
    const store = createStore(
      duck.combinedReducer,
      applyMiddleware(streamerMiddleware, ...extraMiddlewares)
    )
    duck[initialize](store.getState, store.dispatch)
    streamerMiddleware.run(combineStreamers(...duck.streamers))
    this.redux = store
    this.middleware = streamerMiddleware
  }

  connect<OriginProps>(
    Component: React.FunctionComponent<OriginProps & ConnectedProps<TDuck>>
  ): React.FunctionComponent<OriginProps> {
    const { duck, redux } = this
    const connectComponent: InferableComponentEnhancerWithProps<DuckState<TDuck> & Dispatch, any> =
      connect(
        (state) => ({ store: state }),
        (dispatch) => ({ dispatch })
      )
    const ConnectedComponent = connectComponent(Component as any)
    return function (props) {
      return (
        <Provider store={redux}>
          <ConnectedComponent {...props} duck={duck} />
        </Provider>
      )
    }
  }

  [Symbol.dispose](): void {
    const { duck } = this
    duck[Symbol.dispose]()
    this.middleware.close()
  }
}
