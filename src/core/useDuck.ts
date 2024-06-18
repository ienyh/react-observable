import { useRef, useSyncExternalStore } from 'react'
import Base from './Base'
import Runtime, { DuckRuntimeOptions } from './Runtime'
import { DuckType } from './type'

/**
 * You can use hook `useDuck` to create redux store
 * @param Duck
 * @param options
 * @returns {ConnectedProps<Duck>}
 * @example
 * const { store, dispatch, duck } = useDuck(Base)
 */
export default function useDuck<T extends Base>(Duck: DuckType<T>, options?: DuckRuntimeOptions) {
  const ref = useRef(Runtime.create(Duck, options))
  const { redux, duck } = ref.current
  const { subscribe, getState, dispatch } = redux
  const store = useSyncExternalStore(subscribe, getState)
  return {
    store,
    dispatch,
    duck,
  }
}
