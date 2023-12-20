import { Dispatch, Action, StateFromReducersMapObject, Reducer } from 'redux';
import { TYPES, DUCKS, DucksState } from './type';
import { Streamer } from '../middleware';
export default class Base {
    getState: () => Readonly<StateFromReducersMapObject<this['reducers']>>;
    dispatch: Dispatch<Action>;
    id: string;
    actionTypePrefix: string;
    constructor(prefix: any);
    init(getState: any, dispatch: Dispatch<Action>): void;
    get quickTypes(): {};
    get types(): TYPES<this["quickTypes"]>;
    get reducers(): {};
    get streamers(): Streamer[];
    get creators(): {};
    get quickDucks(): {};
    get ducks(): DUCKS<this["quickDucks"]>;
    get combinedReducer(): Reducer<StateFromReducersMapObject<this["reducers"] & DucksState<this["ducks"]>>>;
}
