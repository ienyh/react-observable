import { Action, Middleware, Dispatch } from 'redux'
import { Observable, Subscription } from 'rxjs'

export interface Streamer<A extends Action = Action> {
  (observable$: Observable<A>): Subscription
}

export interface StreamMiddleware<A extends Action, S extends any>
  extends Middleware<{}, S, Dispatch<Action>> {
  run(rootStreamer: Streamer<A>): void
  close(): void
}
