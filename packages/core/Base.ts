import { Dispatch, Action, combineReducers, ReducersMapObject, Reducer } from 'redux'
import { Observable, Subscription } from 'rxjs'
import { Streamer } from 'redux-observable-action'
import { Cache, preformInits, collectStreamers, preformObservables } from '@/decorator'
import type { DuckReducersState, DuckType, Ducks, DucksState, Types } from './type'

/**
 * @internal
 */
export const initialize = Symbol('@initialize')

export default class Base implements Disposable {
  getState: () => Readonly<DuckReducersState<this['reducers']>> & DucksState<this['ducks']>
  dispatch: Dispatch<Action>
  readonly id = generateID()
  readonly actionTypePrefix: string
  protected subscription = new Subscription()
  constructor(prefix: string) {
    this.actionTypePrefix = prefix
  }
  [Symbol.dispose](): void {
    Object.values(this.ducks).forEach((duck) => {
      duck[Symbol.dispose]()
    })
    this.subscription.unsubscribe()
  }
  /**
   * @internal
   */
  [initialize](getState, dispatch: Dispatch<Action>) {
    this.getState = getState
    this.dispatch = dispatch
    const ducks = this.ducks
    const selector = (getState, duck) => {
      return () => getState()[duck]
    }
    Object.keys(ducks).forEach((duck) => {
      ducks[duck][initialize](selector(getState, duck), dispatch)
    })
    preformInits(this)
    this.subscription.add(preformObservables(this))
  }
  get quickTypes() {
    return {}
  }
  /**
   * @internal
   */
  @Cache()
  get types() {
    return makeTypes(this.actionTypePrefix, this.quickTypes) as Types<this['quickTypes']>
  }
  get reducers(): ReducersMapObject {
    return {}
  }
  get quickSelectors() {
    return {}
  }
  /**
   * @internal
   */
  @Cache()
  get selectors(): this['quickSelectors'] {
    return this.quickSelectors
  }
  get creators() {
    return {}
  }
  get quickDucks() {
    return {}
  }
  @Cache()
  get ducks() {
    return makeDucks<this['quickDucks']>(this.quickDucks, this.actionTypePrefix)
  }
  /**
   * @internal
   */
  @Cache()
  get combinedReducer(): Reducer {
    const reducer = {
      ...this.reducers,
    } as any
    const ducks = this.ducks
    Object.keys(ducks).forEach((duck) => {
      reducer[duck] = ducks[duck].combinedReducer
    })
    return combineReducers(reducer)
  }
  /**
   * @internal
   */
  @Cache()
  get streamers(): Streamer[] {
    const streamers = []
    const namespace = Symbol('namespace')
    function collect(duck: Base) {
      streamers.push(
        ...collectStreamers(duck).map((s) => {
          const result = s.bind(duck)
          Object.defineProperty(result, namespace, { value: duck.actionTypePrefix })
          return result
        })
      )
      Object.keys(duck.ducks).forEach((key) => {
        const subDuck = duck.ducks[key]
        collect(subDuck)
      })
    }
    collect(this)
    function warp(fn): Streamer {
      return function (action$: Observable<Action>) {
        return fn(
          action$.pipe(function ($) {
            return new Observable((subscriber) => {
              $.subscribe((action) => {
                if (action.type.startsWith(Object.getOwnPropertyDescriptor(fn, namespace).value)) {
                  subscriber.next(action)
                }
              })
            })
          })
        )
      }
    }
    return streamers.map(warp).reverse()
  }
}

function generateID() {
  return 'xxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

function makeTypes(prefix, typeEnum) {
  let typeList = []
  const types = {}
  if (typeEnum) {
    typeList = typeList.concat(Object.keys(typeEnum))
  }
  typeList.forEach((type) => {
    types[type] = `${prefix}/${type}`
  })
  return types
}

function makeDucks<T extends Record<string, DuckType<Base>>>(ducks: T, prefix: string): Ducks<T> {
  const map = {} as Ducks<T>
  for (const route of Object.keys(ducks)) {
    let Duck = ducks[route]
    map[route as keyof T] = new Duck(`${prefix}/${Duck.name}`) as any
  }
  return map
}
