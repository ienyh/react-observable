import { onUnmounted, shallowRef } from 'vue'
import { Base, Store } from 'observable-duck'
import type { DuckType } from 'observable-duck'

/**
 * You can use hook `useDuck` to create redux store
 * @param Duck
 * @param options
 * @returns {ConnectedProps<Duck>}
 * @example
 * const { store, dispatch, duck } = useDuck(Base)
 */
export default function useDuck<T extends Base>(Duck: DuckType<T>) {
  const { redux, duck } = Store.create(Duck)
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
