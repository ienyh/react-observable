import { Adaptor } from './Sync.duck';
import { Observable, Subscription } from 'rxjs';

const customHashChangeEvent = new Event('custom.hashchange');

function mixinCustomEvent<T extends Function>(fn: T) {
  const mixed = function (...args: any[]) {
    const result = fn.apply(this, args);
    window.dispatchEvent(customHashChangeEvent);
    return result;
  };
  Object.defineProperties(mixed, {
    length: { value: fn.length },
    name: { value: `${fn.name}AndMixedCustomEvent` },
  });
  return mixed;
}

export class HashAdaptor implements Adaptor, Disposable {
  watchDispose: Function | undefined;
  stateSubscription: Subscription | undefined;

  watch(): Observable<any> {
    function getCurrentState() {
      const state = {};
      const hash = window.location.hash.slice(1); // Remove the '#' character
      const hashParams = new URLSearchParams(hash);
      hashParams.forEach((value, key) => {
        state[key] = value;
      });
      return state;
    }

    const adaptor = this;
    const $ = new Observable((subscriber) => {
      const handler = () => subscriber.next(getCurrentState());
      window.addEventListener('hashchange', handler);
      window.addEventListener(customHashChangeEvent.type, handler);
      // first next
      subscriber.next(getCurrentState());
      adaptor.watchDispose = () => {
        window.removeEventListener('hashchange', handler);
        window.removeEventListener(customHashChangeEvent.type, handler);
      };
    });
    return $;
  }

  preform($state: Observable<any>): void {
    if (this.stateSubscription) {
      this.stateSubscription.unsubscribe();
    }
    const originPushState = history.pushState;
    const originReplaceState = history.replaceState;
    history.pushState = mixinCustomEvent(history.pushState);
    history.replaceState = mixinCustomEvent(history.replaceState);
    this.stateSubscription = $state.subscribe((state) => {
      const hash = new URLSearchParams();
      Object.keys(state).forEach((key) => {
        hash.append(key, state[key]);
      });
      const newHash = `#${hash.toString()}`;
      if (newHash === window.location.hash) {
        return;
      }
      // 使用原始 history.replaceState 不再触发事件流出
      originReplaceState.apply(history, [state, '', `${location.pathname}${newHash}`]);
    });
  }

  [Symbol.dispose](): void {
    if (this.stateSubscription) {
      this.stateSubscription.unsubscribe();
    }
    if (this.watchDispose) {
      this.watchDispose();
    }
  }
}