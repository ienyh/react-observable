import { Observable, Subscription } from 'rxjs'
import type { Streamer } from 'redux-observable-action'
import { FROM_$_METADATA_KEY, INIT_PRIORITY_KEY, STREAMER_METADATA_KEY } from '.'

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

/**
 * @internal
 */
export function collectStreamers(target: Object) {
  const methodNames = Reflect.getMetadata(STREAMER_METADATA_KEY, target) || []
  return methodNames.map((method) => target[method]) as Array<Streamer>
}
