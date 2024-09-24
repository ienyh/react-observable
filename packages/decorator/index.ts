import 'reflect-metadata'
import { InteropObservable, Observable, Subscription, from } from 'rxjs'
import { Streamer } from 'redux-observable-action'

export function SetMethodMetadata(key: string | Symbol | number, value: any) {
  return function (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata(key, value, target, propertyKey)
  }
}

const INIT_PRIORITY_KEY = Symbol('init_with_priority')
export const Init =
  (priority = 0) =>
  (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => {
    let map: Map<string, number> = Reflect.getMetadata(INIT_PRIORITY_KEY, target)
    if (!map) {
      map = new Map()
    }
    map.set(propertyKey, priority)
    Reflect.defineMetadata(INIT_PRIORITY_KEY, map, target)
  }

/**
 * @internal
 */
export function preformInits(target) {
  const map: Map<string, number> = Reflect.getMetadata(INIT_PRIORITY_KEY, target)
  if (map) {
    Array.from(map)
      .sort((a, b) => b[1] - a[1])
      .map((item) => item[0])
      .forEach((propertyKey) => {
        Function.prototype.call.call(target[propertyKey], target)
      })
  }
}

const FROM_$_METADATA_KEY = Symbol('from$_with_metadata')
export const From =
  <T>($: Observable<T> | InteropObservable<T>) =>
  (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    let fromMap: Map<string | symbol, Observable<T>> = Reflect.getMetadata(
      FROM_$_METADATA_KEY,
      target
    )
    if (!fromMap) {
      fromMap = new Map()
    }
    fromMap.set(propertyKey, $ instanceof Observable ? $ : from($))
    Reflect.defineMetadata(FROM_$_METADATA_KEY, fromMap, target)
  }

/**
 * @internal
 */
export function preformObservables(target: Object) {
  const subscription = new Subscription()
  const fromMap: Map<string, Observable<any>> = Reflect.getMetadata(FROM_$_METADATA_KEY, target)
  if (fromMap) {
    fromMap.forEach(($, propertyKey) => {
      const method: Function = target[propertyKey]
      subscription.add(method.call(target, $))
    })
  }
  return subscription
}

const STREAMER_METADATA_KEY = Symbol('streamer_methods_with_metadata')
/**
 * @deprecated
 * Use `@Action` instead of `@StreamerMethod()`
 */
export const StreamerMethod =
  () => (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    const methods = Reflect.getMetadata(STREAMER_METADATA_KEY, target) || []
    methods.push(propertyKey)
    Reflect.defineMetadata(STREAMER_METADATA_KEY, methods, target)
  }
export const Action = StreamerMethod()

/**
 * @internal
 */
export function collectStreamers(target: Object) {
  const methodNames = Reflect.getMetadata(STREAMER_METADATA_KEY, target) || []
  return methodNames.map((method) => target[method]) as Array<Streamer>
}

export function Cache(millisecond: number = Infinity) {
  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const isGetter = descriptor.get !== undefined
    const originalMethod = isGetter ? descriptor.get : descriptor.value
    const cacheKey = Symbol(`__cache__${String(propertyKey)}`)
    const cacheExpireKey = Symbol(`__cacheExpire__${String(propertyKey)}`)

    function applyCache(target: any, value: any) {
      target[cacheKey] = value
      target[cacheExpireKey] = Date.now() + millisecond
    }

    function isCacheValid(target: any): boolean {
      return (
        target[cacheExpireKey] && (target[cacheExpireKey] > Date.now() || millisecond === Infinity)
      )
    }

    if (isGetter) {
      descriptor.get = function () {
        if (isCacheValid(this)) {
          return this[cacheKey]
        }
        const result = originalMethod.apply(this)
        applyCache(this, result)
        return result
      }
    } else {
      descriptor.value = function (...args: any[]) {
        if (isCacheValid(this)) {
          return this[cacheKey]
        }
        const result = originalMethod.apply(this, args)
        applyCache(this, result)
        return result
      }
    }
  }
}
