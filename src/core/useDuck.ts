import { useMemo, useSyncExternalStore } from 'react'
import Base from './Base'
import Runtime, { DuckRuntimeOptions } from './Runtime'
import { DuckType } from './type'

export default function useDuck<T extends Base>(Duck: DuckType<T>, options?: DuckRuntimeOptions) {
  const runtime = useMemo(() => {
    return Runtime.create(Duck, options)
  }, [Duck, options])
  const { redux } = runtime
  const store = useSyncExternalStore(redux.subscribe, redux.getState)
  return {
    duck: runtime.duck,
    store: store,
    dispatch: redux.dispatch,
  }
}
