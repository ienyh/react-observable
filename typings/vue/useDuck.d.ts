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
    store: import("vue").Ref<any, any> extends ReturnType<T["getState"]> ? ReturnType<T["getState"]> extends infer T_1 ? T_1 extends ReturnType<T["getState"]> ? T_1 extends T_1 & import("vue").Ref<any, any> ? import("@vue/shared").IfAny<T_1, import("vue").ShallowRef<T_1, T_1>, T_1> : import("vue").ShallowRef<T_1, T_1> : never : never : import("vue").ShallowRef<ReturnType<T["getState"]>, ReturnType<T["getState"]>>;
    dispatch: import("redux").Dispatch<import("redux").Action>;
    duck: T;
};
