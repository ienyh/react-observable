import {
  Dispatch,
  Action,
  StateFromReducersMapObject,
  combineReducers,
  Reducer,
  ReducersMapObject,
} from 'redux'
import { Streamer } from 'redux-observable-action'
import { Cache, collectStreamers } from './decorator'
import type { DuckType, Ducks, DucksState, Types } from './type'

export default class Base implements Disposable {
  getState: () => Readonly<this['State']>
  dispatch: Dispatch<Action>
  id = generateID()
  actionTypePrefix: string
  constructor(prefix: string) {
    this.actionTypePrefix = prefix
  }
  [Symbol.dispose](): void {
    Object.values(this.ducks).forEach((duck) => {
      duck[Symbol.dispose]()
    })
    this.dispatch({ type: `${this.actionTypePrefix}/END@@${this.id}` })
  }
  init(getState, dispatch: Dispatch<Action>) {
    this.getState = getState
    this.dispatch = dispatch
    const ducks = this.ducks
    const selector = (getState, duck) => {
      return () => getState()[duck]
    }
    Object.keys(ducks).forEach((duck) => {
      ducks[duck].init(selector(getState, duck), dispatch)
    })
    this.dispatch({ type: `${this.actionTypePrefix}/INIT@@${this.id}` })
  }
  get quickTypes() {
    return {}
  }
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
  State: ReturnType<this['combinedReducer']>
  get combinedReducer() {
    const reducer = {
      ...this.reducers,
    } as any
    const ducks = this.ducks
    Object.keys(ducks).forEach((duck) => {
      reducer[duck] = ducks[duck].combinedReducer
    })
    return combineReducers(reducer) as Reducer<
      Readonly<StateFromReducersMapObject<this['reducers']>> & DucksState<this['ducks']>
    >
  }
  get streamers(): Streamer[] {
    const streamers = []
    function collect(duck) {
      streamers.push(...collectStreamers(duck).map((s) => s.bind(duck)))
      Object.keys(duck.ducks).forEach((key) => {
        const subDuck = duck.ducks[key]
        collect(subDuck)
      })
    }
    collect(this)
    return streamers.reverse()
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
