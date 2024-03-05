import { Dispatch, Action, ReducersMapObject, Reducer } from 'redux';
import { Streamer } from 'redux-observable-action';
import type { DuckReducersState, Ducks, DucksState, Types } from './type';
import { Subscription } from 'rxjs';
export default class Base implements Disposable {
    getState: () => Readonly<DuckReducersState<this['reducers']>> & DucksState<this['ducks']>;
    dispatch: Dispatch<Action>;
    readonly id: string;
    readonly actionTypePrefix: string;
    protected subscription: Subscription;
    constructor(prefix: string);
    [Symbol.dispose](): void;
    init(getState: any, dispatch: Dispatch<Action>): void;
    get quickTypes(): {};
    get types(): Types<this["quickTypes"]>;
    get reducers(): ReducersMapObject;
    get quickSelectors(): {};
    get selectors(): this['quickSelectors'];
    get creators(): {};
    get quickDucks(): {};
    get ducks(): Ducks<this["quickDucks"]>;
    get combinedReducer(): Reducer;
    get streamers(): Streamer[];
}
