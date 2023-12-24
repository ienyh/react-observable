import { Adaptor } from './Route.duck'
import { Observable, Subscription } from 'rxjs'

const custom = new Event('custom.popstate')
function mixinCustomEvent<T extends Function>(fn: T) {
  const mixed = function (...args: any[]) {
    const result = fn.apply(this, args)
    window.dispatchEvent(custom)
    return result
  }
  Object.defineProperties(mixed, {
    length: { value: fn.length },
    name: { value: `${fn.name}AndMixedCustomEvent` },
  })
  return mixed
}

export class BrowserAdaptor implements Adaptor, Disposable {
  watchDispose
  watch(): Observable<any> {
    function getCurrentState() {
      const state = {}
      const searchParams = new URLSearchParams(window.location.search)
      searchParams.forEach((value, key) => {
        state[key] = value
      })
      return state
    }
    const adaptor = this
    const $ = new Observable((subscriber) => {
      const handler = () => subscriber.next(getCurrentState())
      window.addEventListener('popstate', handler)
      window.addEventListener(custom.type, handler)
      // first next
      subscriber.next(getCurrentState())
      adaptor.watchDispose = () => {
        window.removeEventListener('popstate', handler)
        window.removeEventListener(custom.type, handler)
      }
    })
    return $
  }

  stateSubscription: Subscription
  preform($state: Observable<any>): void {
    if (this.stateSubscription) {
      this.stateSubscription.unsubscribe()
    }
    const originPushState = history.pushState
    const originReplaceState = history.replaceState
    history.pushState = mixinCustomEvent(history.pushState)
    history.replaceState = mixinCustomEvent(history.replaceState)
    this.stateSubscription = $state.subscribe((state) => {
      const search = new URLSearchParams()
      Object.keys(state).forEach((key) => {
        search.append(key, state[key])
      })
      if (search.toString() === location.search.slice(1)) {
        return
      }
      originReplaceState.apply(history, [state, '', `${location.pathname}?${search.toString()}`])
    })
  }

  [Symbol.dispose](): void {
    if (this.stateSubscription) {
      this.stateSubscription.unsubscribe()
    }
    if (this.watchDispose) {
      this.watchDispose()
    }
  }
}
