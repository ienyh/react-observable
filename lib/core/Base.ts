import { Dispatch, Action, StateFromReducersMapObject } from 'redux'
import { TYPES } from './type'
import { Streamer } from '../middleware'

export default class Base {
  getState: () => Readonly<StateFromReducersMapObject<this['reducers']>>
  dispatch: Dispatch<Action>
  id = generateUUID()
  actionTypePrefix = '@@Base/'
  get quickTypes() {
    return {}
  }
  get types() {
    return Object.assign({}, makeTypes(this.actionTypePrefix, this.quickTypes)) as TYPES<
      this['quickTypes']
    >
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
  init(getState, dispatch: Dispatch<Action>) {
    this.getState = getState
    this.dispatch = dispatch
  }
  constructor() {}
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
    types[type] = prefix + type
  })
  return types
}
