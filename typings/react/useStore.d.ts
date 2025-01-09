import { Base, Store } from '../core';
/**
 * You can use hook `useStore` to use the duck store context
 * @example
 * const { store, dispatch, duck } = useStore(Store)
 */
export default function useStore<T extends Base>(DuckStore: Store<T>): {
    store: ReturnType<T["getState"]>;
    dispatch: import("redux").Dispatch<import("redux").Action>;
    duck: T;
};
