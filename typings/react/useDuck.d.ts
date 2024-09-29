import { Base } from '../core';
import type { DuckType } from '../core';
import { DuckStoreOptions } from '../core/Store';
/**
 * You can use hook `useDuck` to create redux store
 * @param Duck
 * @param options
 * @returns {ConnectedProps<Duck>}
 * @example
 * const { store, dispatch, duck } = useDuck(Base)
 */
export default function useDuck<T extends Base>(Duck: DuckType<T>, options?: DuckStoreOptions): {
    store: ReturnType<T["getState"]>;
    dispatch: import("redux").Dispatch<import("redux").Action>;
    duck: T;
};
