import { Action, Dispatch, Middleware } from 'redux'
import Base from './core/Base'
import { Observable, Subscription } from 'rxjs'

export interface Streamer<A extends Action = Action> {
  (observable$: Observable<A>): Subscription
}
export interface StreamMiddleware<A extends Action, S extends any>
  extends Middleware<{}, S, Dispatch<Action>> {
  run(rootStreamer: Streamer<A>): void
  close(): void
}

export type Types<T> = {
  readonly [K in keyof T]: string
}
export type DuckType<T extends Base> = { new (prefix: string): T }
export type Ducks<T extends Record<string, DuckType<Base>>> = {
  [key in keyof T]: InstanceType<T[key]>
}

export type DucksState<T extends Record<string, DuckType<Base>>> = {
  [K in keyof T]: T[K] extends Base ? ReturnType<T[K]['combinedReducer']> : never
}
export type DuckState<Duck extends Base> = ReturnType<Duck['combinedReducer']>

export interface PayloadAction<T extends any = any> extends Action {
  payload?: T
}

export interface ConnectedProps<Duck extends Base> {
  duck: Duck
  store: DuckState<Duck>
  dispatch: Dispatch
}

export type PayloadActionCreator<P> = (payload: P) => PayloadAction<P>
