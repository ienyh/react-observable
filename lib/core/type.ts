import { Action, Dispatch, ReducersMapObject, StateFromReducersMapObject } from 'redux'
import { Streamer } from '../middleware'

export type TYPES<T> = {
  readonly [K in keyof T]: string;
};

export interface PayloadAction<T extends any = any> extends Action {
  payload?: T
}

export interface ConnectedProps<Duck extends StreamerLogicComponent> {
  duck: Duck
  store: StateFromReducersMapObject<Duck['reducers']>
  dispatch: Dispatch
}

export type PayloadActionCreator<P> = (payload: P) => PayloadAction<P>

export interface StreamerLogicComponent<S = any, A extends Action = Action, P = any> {
  getState?: () => S
  dispatch?: Dispatch<A>
  id: Readonly<string>
  types: TYPES<Record<string, string>>
  reducers: ReducersMapObject<S, A>
  streamers: ReadonlyArray<Streamer>
  creators: Readonly<{ [K in keyof P]: PayloadActionCreator<P[K]> }>
}
