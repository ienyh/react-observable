import Base from '@core/Base'

export interface Adaptor {}
export interface RouteParam<T = any> {
  key: string
  stringify: (param: T) => string
  parse: (param: string) => T
}
export class Route extends Base {
  get param(): Array<RouteParam> {
    return []
  }
  get adaptor(): Adaptor {
    return {}
  }
}
