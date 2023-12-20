import { Dispatch, Action, StateFromReducersMapObject, combineReducers, Reducer } from 'redux'
import { TYPES, DUCKS, DuckType, DucksState } from './type'
import { Streamer } from '../middleware'

export default class Base {
  getState: () => Readonly<StateFromReducersMapObject<this['reducers']>>
  dispatch: Dispatch<Action>
  id = generateUUID()
  private actionTypePrefix: string
  constructor(prefix) {
    this.actionTypePrefix = prefix
  }
  init(getState, dispatch: Dispatch<Action>) {
    this.getState = getState
    this.dispatch = dispatch
    const ducks = this.ducks
    Object.keys(ducks).forEach((duck) => {
      ducks[duck].init(getState, dispatch)
    })
  }
  get quickTypes() {
    return {}
  }
  get types() {
    return makeTypes(this.actionTypePrefix, this.quickTypes) as TYPES<this['quickTypes']>
  }
  get reducers() {
    return {}
  }
  get streamers(): Streamer[] {
    return []
  }
  get creators() {
    return {}
  }
  get quickDucks() {
    return {}
  }
  get ducks() {
    return makeDucks<this['quickDucks']>(this.quickDucks, this.actionTypePrefix)
  }
  get combinedReducer() {
    const reducer = {
      ...this.reducers,
    }
    const ducks = this.ducks
    Object.keys(ducks).forEach((duck) => {
      reducer[duck] = ducks[duck].combinedReducer
    })
    return combineReducers(reducer) as Reducer<
      StateFromReducersMapObject<this['reducers'] & DucksState<this['ducks']>>
    >
  }
}

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
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

function makeDucks<T extends Record<string, DuckType<Base>>>(ducks: T, prefix: string): DUCKS<T> {
  const map = {} as DUCKS<T>
  for (const route of Object.keys(ducks)) {
    let Duck = ducks[route]
    map[route as keyof T] = new Duck(`${prefix}/${Duck.name}`) as any
  }
  return map
}
