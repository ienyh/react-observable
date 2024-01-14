import Base from './Base';
import { DuckRuntimeOptions } from './Runtime';
import { DuckType } from './type';
export default function useDuck<T extends Base>(Duck: DuckType<T>, options?: DuckRuntimeOptions): {
    duck: T;
    store: ReturnType<T["getState"]>;
    dispatch: import("redux").Dispatch<import("redux").Action>;
};
