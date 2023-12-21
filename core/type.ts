import { Action, Dispatch, Reducer } from 'redux'
import Base from './Base'

export type TYPES<T> = {
  readonly [K in keyof T]: string
}
export type DuckType<T extends Base> = { new (prefix: string): T }
export type Ducks<T extends Record<string, DuckType<Base>>> = {
  [key in keyof T]: InstanceType<T[key]>
}

export type StateFromReducer<R> = R extends Reducer<infer S> ? S : never
export type DucksState<T extends Record<string, DuckType<Base>>> = {
  [K in keyof T]: T[K] extends Base ? StateFromReducer<T[K]['combinedReducer']> : never
}
export type DuckState<Duck extends Base> = StateFromReducer<Duck['combinedReducer']>

export interface PayloadAction<T extends any = any> extends Action {
  payload?: T
}

export interface ConnectedProps<Duck extends Base> {
  duck: Duck
  store: DuckState<Duck>
  dispatch: Dispatch
}

export type PayloadActionCreator<P> = (payload: P) => PayloadAction<P>
