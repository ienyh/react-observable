import { useRef, useSyncExternalStore } from 'react'
import { Base, Store } from '../core'
import type { DuckType } from '../core'
import { DuckStoreOptions } from '../core/Store'

/**
 * You can use hook `useDuck` to create redux store
 * @param Duck
 * @param options
 * @returns {ConnectedProps<Duck>}
 * @example
 * const { store, dispatch, duck } = useDuck(Base)
 */
export default function useDuck<T extends Base>(Duck: DuckType<T>, options?: DuckStoreOptions) {
  const ref = useRef(new Store(Duck, options))
  const { redux, duck } = ref.current
  const { subscribe, getState, dispatch } = redux
  const store = useSyncExternalStore(subscribe, getState)
  return {
    store,
    dispatch,
    duck,
  }
}
