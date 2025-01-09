import { useRef, useSyncExternalStore } from 'react'
import { Base, Store } from '../core'

/**
 * You can use hook `useStore` to use the duck store context
 * @param Duck
 * @param options
 * @returns {ConnectedProps<Duck>}
 * @example
 * const { store, dispatch, duck } = useStore(Store)
 */
export default function useStore<T extends Base>(DuckStore: Store<T>) {
  const ref = useRef(DuckStore)
  const { redux, duck } = ref.current
  const { subscribe, getState, dispatch } = redux
  const store = useSyncExternalStore(subscribe, getState)
  return {
    store,
    dispatch,
    duck,
  }
}
