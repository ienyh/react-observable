import { Action, Middleware, Dispatch } from 'redux';
import * as Rx from 'rxjs';
export interface Streamer<A extends Action = Action> {
    (observable$: Rx.Observable<A>): Rx.Subscription;
}
export interface StreamMiddleware<A extends Action, S extends any> extends Middleware<{}, S, Dispatch<Action>> {
    run(rootStreamer: Streamer<A>): void;
    close(): void;
}
