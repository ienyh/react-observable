import { Dispatch, Action, StateFromReducersMapObject, ReducersMapObject, Reducer } from 'redux';
import { Streamer } from 'redux-observable-action';
import type { Ducks, DucksState, Types } from './type';
export default class Base implements Disposable {
    getState: () => Readonly<StateFromReducersMapObject<this['reducers']>> & DucksState<this['ducks']>;
    dispatch: Dispatch<Action>;
    id: string;
    actionTypePrefix: string;
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
