import * as React from "react";
import { createLogger } from "redux-logger";
import { Dispatch, StateFromReducersMapObject, Store, applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { createStreamMiddleware } from "../middleware/createStreamMiddleware";
import { combineStreamers } from "../middleware/combineStreamers";
import { InferableComponentEnhancerWithProps, Provider, connect } from "react-redux";
import Base from "./Base";
import { ConnectedProps, PayloadAction } from "./type";
import { collectStreamers } from "../decorator/method";
import { StreamMiddleware } from "../middleware/type";

export interface DuckRuntimeOptions {
  prefix?: string
}
export default class Runtime<TDuck extends Base = Base> implements Disposable {
  static create<T extends Base>(Duck: new (prefix: string) => T, options?: DuckRuntimeOptions) {
    return new Runtime<T>(Duck, options)
  }

  duck: TDuck
  protected store: Store
  protected middleware: StreamMiddleware<PayloadAction, StateFromReducersMapObject<TDuck['reducers']>>
  protected constructor(Duck: new (prefix: string) => TDuck, options?: DuckRuntimeOptions) {
    this.duck = new Duck(options?.prefix ?? Duck.name)
    this.initReduxStore()
  }

  protected initReduxStore() {
    const duck = this.duck
    const streamerMiddleware = createStreamMiddleware()
    const logger = process.env.NODE_ENV === 'development'
      ? createLogger({ collapsed: true })
      : () => (next) => (action) => next(action)
    const store = legacy_createStore(
      duck.combinedReducer,
      applyMiddleware(streamerMiddleware, logger)
    )
    const streamers = [...duck.streamers, ...collectStreamers(this.duck)].map(o => o.bind(duck))
    duck.init(store.getState, store.dispatch)
    duck.dispatch({ type: `${duck.actionTypePrefix}@INIT` })
    streamerMiddleware.run(combineStreamers(...streamers))
    this.store = store
    this.middleware = streamerMiddleware
  }

  connect<OriginProps>(
    Component: React.FunctionComponent<OriginProps & ConnectedProps<TDuck>>
  ): React.FunctionComponent<OriginProps> {
    const runtime = this
    const { duck, store } = this
    type State = StateFromReducersMapObject<typeof duck.reducers>
    const connectComponent: InferableComponentEnhancerWithProps<State & Dispatch, any> = connect(
      (state) => ({ store: state }),
      (dispatch) => ({ dispatch })
    )
    const ConnectedComponent = connectComponent(Component as any)
    return function (props) {
      React.useEffect(() => {
        return runtime[Symbol.dispose]
      }, [])
       return (
        <Provider store={store}>
          <ConnectedComponent {...props} duck={duck} />
        </Provider>
      )
    }
  }

  [Symbol.dispose](): void {
    const { duck } = this;
    duck.dispatch({ type: `${duck.actionTypePrefix}@END` })
    this.middleware.close()
  }
}
