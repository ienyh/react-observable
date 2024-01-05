import type { Action } from 'redux';
export declare interface PayloadAction<T extends any = any> extends Action {
    payload?: T;
}
export declare type PayloadActionCreator<P> = (payload: P) => PayloadAction<P>;
export declare function createPayloadAction<P = any>(type: string): PayloadActionCreator<P>;
export declare function reduceFromPayload<TState, TType = string>(actionType: TType, initialState: TState): (state: TState, action: {
    type: TType;
    payload?: TState;
}) => TState;
export declare function createToPayload<TState, TType = string>(actionType: TType): (payload: TState) => {
    type: TType;
    payload: TState;
};
