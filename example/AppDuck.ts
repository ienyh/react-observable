import { Action } from 'redux'
import Base from '../src/core/Base'
import { Observable } from 'rxjs'
import { StreamerMethod } from '../src/core/decorator'
import { filterAction } from '../src/operator'

enum Type {
  INCREMENT,
  DECREMENT,
}
export default class AppDuck extends Base {
  get quickDucks() { 
    return {
      ...super.quickDucks,
      sub: SubAppDuck,
    }
  }
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
    }
  }

  @StreamerMethod()
  incrementStreamer(action$: Observable<Action>) {
    const duck = this
    return action$.pipe(filterAction(duck.types.INCREMENT)).subscribe((action) => {
      const state = duck.getState()
      console.log(state);
    })
  }
}

class SubAppDuck extends Base {
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
    }
  }

  @StreamerMethod()
  incrementStreamer(action$: Observable<Action>) {
    const duck = this
    return action$.pipe(filterAction(duck.types.INCREMENT)).subscribe((action) => {
      const state = duck.getState()
      console.log(state);
    })
  }
}
