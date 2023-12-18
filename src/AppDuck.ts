import { Action } from 'redux'
import Base from '../lib/core/Base'
import { Observable, filter } from 'rxjs'
import { createToPayload } from '../lib/core/util'
import { StreamerMethod } from '../lib/decorator/method'
import { filterAction } from '../lib/operator'

enum Type {
  INCREMENT,
  DECREMENT,
  FETCH_START,
  FETCH_DONE,
  FETCHING,
}
export default class AppDuck extends Base {
  actionTypePrefix = 'App/'
  get quickTypes() {
    return {
      ...super.quickTypes,
      ...Type,
    }
  }
  get reducers() {
    const types = this.types
    return {
      name: (state: string) => 'init name',
      timestamp: (state: number) => Date.now(),
      count: (state = 0, action) => {
        switch (action.type) {
          case types.INCREMENT:
            return state + 1
          case types.DECREMENT:
            return state - 1
          default:
            return state
        }
      },
    }
  }
  get creators() {
    const types = this.types
    return {
      ...super.creators,
      increment: () => ({ type: types.INCREMENT }),
      decrement: () => ({ type: types.DECREMENT }),
      fetch: createToPayload<string>(types.FETCH_START),
    }
  }
  get streamers() {
    const { types } = this
    return [
      ...super.streamers,
      function incrementStreamer(action$: Observable<Action>) {
        return action$.pipe(filter((a) => a.type === types.INCREMENT)).subscribe((action) => {})
      },
    ]
  }

  @StreamerMethod()
  fetchStreamer(action$: Observable<Action>) {
    const duck = this
    return action$.pipe(filterAction(duck.types.FETCH_START)).subscribe((action) => {
      duck.dispatch({ type: duck.types.INCREMENT })
      console.log(action)
    })
  }
}
