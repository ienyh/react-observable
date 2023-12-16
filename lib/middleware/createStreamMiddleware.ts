import { Action } from 'redux'
import {
  Subject,
  observeOn,
  queueScheduler as QueueScheduler,
  Subscription,
} from 'rxjs'
import { StreamMiddleware } from './type'

export function createStreamMiddleware<A extends Action = Action, S = any>(): StreamMiddleware<
  A,
  S
> {
  const actionSubject$ = new Subject<A>()
  const action$ = actionSubject$.asObservable().pipe(observeOn(QueueScheduler))
  let getState: () => S
  let subscription: Subscription
  const middleware: StreamMiddleware<A, S> = (store) => {
    getState = store.getState
    return (next) => (action: A) => {
      next(action)
      actionSubject$.next(action)
    }
  }
  middleware.run = (streamer) => {
    if (subscription || subscription?.closed) return
    subscription = streamer(action$)
  }
  middleware.close = () => {
    if (!subscription || !subscription?.unsubscribe) return
    subscription.unsubscribe()
  }
  return middleware
}
