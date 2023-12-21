import { Action, Dispatch, StateFromReducersMapObject } from 'redux'
import Base from './Base'

export type DuckState<Duck extends Base> = StateFromReducersMapObject<Duck['reducers']>
export type DucksState<T extends Record<string, Base>> = {
  [K in keyof T]: DuckState<T[K]>
}
export type TYPES<T> = {
  readonly [K in keyof T]: string
}
export type DuckType<T extends Base> = { new (prefix: string): T }
export type DUCKS<T extends Record<string, DuckType<Base>>> = {
  [key in keyof T]: InstanceType<T[key]>
}

export interface PayloadAction<T extends any = any> extends Action {
  payload?: T
}

export interface ConnectedProps<Duck extends Base> {
  duck: Duck
  store: StateFromReducersMapObject<Duck['reducers']> & DucksState<Duck['ducks']>
  dispatch: Dispatch
}

export type PayloadActionCreator<P> = (payload: P) => PayloadAction<P>