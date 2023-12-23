import { Adaptor } from './Route.duck'
import { Observable, Subscription } from 'rxjs'

export class BrowserAdaptor implements Adaptor, Disposable {
  watch(): Observable<any> {
    function getCurrentState() {
      const state = {}
      const searchParams = new URLSearchParams(window.location.search)
      searchParams.forEach((value, key) => {
        state[key] = value
      })
      return state
    }
    const $ = new Observable((subscriber) => {
      subscriber.next(getCurrentState())
      window.addEventListener('popstate', () => {
        subscriber.next(getCurrentState())
      })
    })
    return $
  }

  stateSubscription: Subscription
  preform($state: Observable<any>): void {
    if (this.stateSubscription) {
      this.stateSubscription.unsubscribe()
    }
    this.stateSubscription = $state.subscribe((state) => {
      const search = new URLSearchParams()
      Object.keys(state).forEach((key) => {
        search.append(key, state[key])
      })
      window.history.replaceState(state, '', `${location.pathname}?${search.toString()}`)
    })
  }

  [Symbol.dispose](): void {
    if (this.stateSubscription) {
      this.stateSubscription.unsubscribe()
    }
  }
}
