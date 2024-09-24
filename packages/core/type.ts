import type { Action, Dispatch, Reducer } from 'redux'
import Base from './Base'

export declare interface PayloadAction<T extends any = any> extends Action {
  payload?: T
}

export type Types<T> = {
  readonly [K in keyof T]: string
}
export declare type DuckType<T extends Base> = { new (prefix: string): T }
export declare type Ducks<T extends Record<string, DuckType<Base>>> = {
  [K in keyof T]: InstanceType<T[K]>
}

export declare type DuckReducersState<R> = {
  [K in keyof R]: R[K] extends Reducer ? ReturnType<R[K]> : never
}
export declare type DucksState<T extends Record<string, DuckType<Base>>> = {
  [K in keyof T]: T[K] extends Base ? DuckState<T[K]> : never
}
/**
 * get duck's redux store state types
 */
export declare type DuckState<T extends Base> = ReturnType<T['getState']>

export declare interface ConnectedProps<Duck extends Base> {
  duck: Duck
  store: DuckState<Duck>
  dispatch: Dispatch
}
