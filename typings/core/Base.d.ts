import { Dispatch, Action, ReducersMapObject } from 'redux';
import { Subscription } from 'rxjs';
import type { DuckReducersState, Ducks, DucksState } from './type';
export default class Base implements Disposable {
    getState: () => Readonly<DuckReducersState<this['reducers']>> & DucksState<this['ducks']>;
    dispatch: Dispatch<Action>;
    readonly id: string;
    readonly actionTypePrefix: string;
    protected subscription: Subscription;
    constructor(prefix: string);
    [Symbol.dispose](): void;
    get quickTypes(): {};
    get reducers(): ReducersMapObject;
    get quickSelectors(): {};
    get creators(): {};
    get quickDucks(): {};
    get ducks(): Ducks<this["quickDucks"]>;
}
