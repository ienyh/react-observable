import { Action } from 'redux';
import { Observable } from 'rxjs';
export declare function filterAction<A extends Action = Action>(type: string | string[] | number | number[]): (source: Observable<A>) => Observable<A>;
