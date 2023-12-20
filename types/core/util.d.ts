import { PayloadActionCreator } from "./type";
export declare function createPayloadAction<P = any>(type: string): PayloadActionCreator<P>;
export declare function reduceFromPayload<TState, TType = string>(actionType: TType, initialState: TState): (state: TState, action: {
    type: TType;
    payload?: TState;
}) => TState;
export declare function createToPayload<TState, TType = string>(actionType: TType): (payload: TState) => {
    type: TType;
    payload: TState;
};
