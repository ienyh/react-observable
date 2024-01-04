import { PayloadActionCreator } from "..";

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