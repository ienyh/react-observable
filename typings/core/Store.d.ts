import { Store as ReduxStore, Middleware, Action } from 'redux';
import { StreamMiddleware } from 'redux-observable-action';
import { DuckState, DuckType, PayloadAction } from './type';
import Base from './Base';
export interface DuckStoreOptions {
    prefix?: string;
    middlewares?: Middleware[];
}
export default class Store<TDuck extends Base = Base> implements Disposable {
    static create<T extends Base>(Duck: DuckType<T>, options?: DuckStoreOptions): Store<T>;
    duck: TDuck;
    redux: ReduxStore<DuckState<TDuck>, Action>;
    protected middleware: StreamMiddleware<PayloadAction, DuckState<TDuck>>;
    constructor(Duck: DuckType<TDuck>, options?: DuckStoreOptions);
    [Symbol.dispose](): void;
}
