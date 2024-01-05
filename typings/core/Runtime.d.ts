import * as React from "react";
import { Store } from "redux";
import { StreamMiddleware } from 'redux-observable-action';
import { ConnectedProps, DuckState, DuckType, PayloadAction } from "..";
import Base from "./Base";
export interface DuckRuntimeOptions {
    prefix?: string;
}
export default class Runtime<TDuck extends Base = Base> implements Disposable {
    static create<T extends Base>(Duck: DuckType<T>, options?: DuckRuntimeOptions): Runtime<T>;
    duck: TDuck;
    protected store: Store;
    protected middleware: StreamMiddleware<PayloadAction, DuckState<TDuck>>;
    protected constructor(Duck: DuckType<TDuck>, options?: DuckRuntimeOptions);
    protected initReduxStore(): void;
    connect<OriginProps>(Component: React.FunctionComponent<OriginProps & ConnectedProps<TDuck>>): React.FunctionComponent<OriginProps>;
    [Symbol.dispose](): void;
}
