import { Action } from 'redux'
import { Observable } from 'rxjs'

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

export function effect<A extends any = any, F extends Function = Function>(effecter: F) {
  return (source: Observable<A>) =>
    new Observable<A>((subscriber) => {
      source.subscribe({
        next: (parameter) => {
          effecter(parameter)
          subscriber.next(parameter)
        },
        error: subscriber.error,
        complete: subscriber.complete,
      })
    })
}
