import type { Action } from 'redux'

export declare interface PayloadAction<T extends any = any> extends Action {
  payload?: T
}
export declare type PayloadActionCreator<P> = (payload: P) => PayloadAction<P>

export function createPayloadAction<P = any>(type: string): PayloadActionCreator<P> {
  return (payload: P) => ({
    type,
    payload,
  })
}

export function reduceFromPayload<TState, TType = string>(
  actionType: TType,
  initialState: TState
) {
  return (
    state: TState = initialState,
    action: { type: TType; payload?: TState }
  ) => {
    if (action.type === actionType) {
      return action.payload;
    }
    return state;
  };
}

export function createToPayload<TState, TType = string>(actionType: TType) {
  return (payload: TState) => ({
    type: actionType,
    payload
  });
}