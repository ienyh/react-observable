import { Action, Dispatch } from 'redux'
import Base from './core/Base'

declare type Types<T> = {
  readonly [K in keyof T]: string
}
declare type DuckType<T extends Base> = { new (prefix: string): T }
declare type Ducks<T extends Record<string, DuckType<Base>>> = {
  [key in keyof T]: InstanceType<T[key]>
}

declare type DucksState<T extends Record<string, DuckType<Base>>> = {
  [K in keyof T]: T[K] extends Base ? ReturnType<T[K]['combinedReducer']> : never
}
declare type DuckState<Duck extends Base> = ReturnType<Duck['combinedReducer']>

declare interface PayloadAction<T extends any = any> extends Action {
  payload?: T
}

declare interface ConnectedProps<Duck extends Base> {
  duck: Duck
  store: DuckState<Duck>
  dispatch: Dispatch
}

declare type PayloadActionCreator<P> = (payload: P) => PayloadAction<P>
