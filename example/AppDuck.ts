import { Action } from 'redux'
import { Base, Init, StreamerMethod, filterAction, reduceFromPayload, take } from '../src'
import { Observable } from 'rxjs'
import { createSelector } from 'reselect'

enum Type {
  INCREMENT,
  DECREMENT,
  SET_VALUE,
}
export default class AppDuck extends Base {
  get quickDucks() {
    return {
      sub: SubAppDuck,
    }
  }
  get quickTypes() {
    return {
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
      value: reduceFromPayload<string>(types.SET_VALUE, ''),
    }
  }
  get creators() {
    const types = this.types
    return {
      increment: () => ({ type: types.INCREMENT }),
      decrement: () => ({ type: types.DECREMENT }),
    }
  }
  get quickSelectors() {
    type State = ReturnType<this['getState']>
    const subSelector = (state: State) => state.sub.subSub
    return {
      sub: subSelector,
      calculatedSubD: createSelector([subSelector], (selector) => selector.ddd),
    }
  }

  @StreamerMethod()
  incrementStreamer(action$: Observable<Action>) {
    const duck = this
    return action$.pipe(take([duck.types.INCREMENT])).subscribe((action) => {
      const state = duck.getState()
      state.sub.subSub.fff
      state.name.length
      state.value
      state.timestamp.toString()
      console.log(state)
    })
  }

  @Init(2)
  accept1() {
    console.log('1')
  }
  @Init(3)
  accept2() {
    console.log('2')
  }
  @Init(1)
  accept3() {
    console.log('3')
  }
}

class SubAppDuck extends Base {
  get quickDucks() {
    return {
      subSub: SubSubAppDuck,
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
      aaa: (state: string) => 'init name',
      bbb: (state: number) => Date.now(),
      ccc: (state = 0, action) => {
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
  test_ns(action$: Observable<Action>) {
    const duck = this
    return action$.pipe().subscribe((action) => {
      const state = duck.getState()
      console.log(action)
    })
  }

  @StreamerMethod()
  incrementStreamer(action$: Observable<Action>) {
    const duck = this
    this.ducks.subSub.subId = 'asdasdasd'
    return action$.pipe(filterAction(duck.types.INCREMENT)).subscribe((action) => {
      const state = duck.getState()
      console.log(state)
    })
  }
}

class SubSubAppDuck extends Base {
  subId = 'SubSubAppDuck'
  get reducers() {
    return {
      ddd: (state: string) => 'init name',
      eee: (state: number) => Date.now(),
      fff: (state = 0, action) => {
        switch (action.type) {
          default:
            return state
        }
      },
    }
  }
}
