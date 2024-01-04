import type { Action, Dispatch, StateFromReducersMapObject } from 'redux';
import Base from './Base';
export type Types<T> = {
    readonly [K in keyof T]: string;
};
export declare type DuckType<T extends Base> = {
    new (prefix: string): T;
};
export declare type Ducks<T extends Record<string, DuckType<Base>>> = {
    [key in keyof T]: InstanceType<T[key]>;
};
export declare type DucksState<T extends Record<string, DuckType<Base>>> = {
    [K in keyof T]: T[K] extends Base ? T[K]['State'] : never;
};
export declare type DuckState<T extends Base> = Readonly<StateFromReducersMapObject<T["reducers"]>> & DucksState<T["ducks"]>;
export declare interface PayloadAction<T extends any = any> extends Action {
    payload?: T;
}
export declare interface ConnectedProps<Duck extends Base> {
    duck: Duck;
    store: DuckState<Duck>;
    dispatch: Dispatch;
}
export declare type PayloadActionCreator<P> = (payload: P) => PayloadAction<P>;
