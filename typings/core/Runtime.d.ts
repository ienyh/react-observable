import * as React from "react";
import { StateFromReducersMapObject, Store } from "redux";
import { StreamMiddleware } from 'redux-observable-action';
import Base from "./Base";
import { ConnectedProps, PayloadAction } from "..";
export interface DuckRuntimeOptions {
    prefix?: string;
}
export default class Runtime<TDuck extends Base = Base> implements Disposable {
    static create<T extends Base>(Duck: new (prefix: string) => T, options?: DuckRuntimeOptions): Runtime<T>;
    duck: TDuck;
    protected store: Store;
    protected middleware: StreamMiddleware<PayloadAction, StateFromReducersMapObject<TDuck['reducers']>>;
    protected constructor(Duck: new (prefix: string) => TDuck, options?: DuckRuntimeOptions);
    protected initReduxStore(): void;
    connect<OriginProps>(Component: React.FunctionComponent<OriginProps & ConnectedProps<TDuck>>): React.FunctionComponent<OriginProps>;
    [Symbol.dispose](): void;
}
