import type { Action } from 'redux'
import { Observable, filter } from 'rxjs'

/**
 * @deprecated
 * Use `take()` instead of `filterAction()`
 */
export function filterAction<A extends Action = Action>(
  type: string | string[] | number | number[]
) {
  const types = Array.isArray(type) ? type : [type]
  return (source: Observable<A>) =>
    new Observable<A>((subscriber) =>
      source.subscribe({
        next: (action) => types.includes(action.type) && subscriber.next(action),
        error: subscriber.error,
        complete: subscriber.complete,
      })
    )
}

/**
 * filter action by type
 * @param type action type or array of action types
 * @returns an `Observable` that only emits actions of the specified type
 */
export function take<A extends Action = Action>(type: string | string[]) {
  const types = Array.isArray(type) ? type : [type]
  return (source: Observable<A>) => source.pipe(filter((action) => types.includes(action.type)))
}
