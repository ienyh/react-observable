import { Action } from 'redux';
import { Observable } from 'rxjs';
export declare function filterAction<A extends Action = Action>(type: string | string[] | number | number[]): (source: Observable<A>) => Observable<A>;
export declare function effect<A extends any = any, F extends Function = Function>(effecter: F): (source: Observable<A>) => Observable<A>;
