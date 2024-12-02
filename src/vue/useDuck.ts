import { onUnmounted, shallowRef } from 'vue'
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
  const { redux, duck } = Store.create(Duck, options)
  const { subscribe, getState, dispatch } = redux
  const store = shallowRef(getState())
  const unsubscribe = subscribe(() => {
    store.value = getState()
  })
  onUnmounted(unsubscribe)
  return {
    store,
    dispatch,
    duck,
  }
}
