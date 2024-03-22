import { Action } from 'redux';
import { Observable } from 'rxjs';
/**
 * @deprecated
 * Use `take()` instead of `filterAction()`
 */
export declare function filterAction<A extends Action = Action>(type: string | string[] | number | number[]): (source: Observable<A>) => Observable<A>;
/**
 * filter action by type
 * @param type action type or array of action types
 * @returns an `Observable` that only emits actions of the specified type
 */
export declare function take<A extends Action = Action>(type: string | string[]): (source: Observable<A>) => Observable<A>;
