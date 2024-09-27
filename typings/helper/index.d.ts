export declare function createPayloadAction<P = any>(type: string): (payload: P) => {
    type: string;
    payload: P;
};
export declare function reduceFromPayload<TState, TType = string>(actionType: TType, initialState: TState): (state: TState, action: {
    type: TType;
    payload?: TState;
}) => TState;
export declare function createToPayload<TState, TType = string>(actionType: TType): (payload: TState) => {
    type: TType;
    payload: TState;
};
