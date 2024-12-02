import 'reflect-metadata';
import { InteropObservable, Observable } from 'rxjs';
export declare function SetMethodMetadata(key: string | Symbol | number, value: any): (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => void;
/**
 * The higher the priority, the earlier the init.
 */
export declare const Init: (priority?: number) => (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare const From: <T>($: Observable<T> | InteropObservable<T>) => (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => void;
/**
 * @deprecated
 * Please use `@Action` instead of `@StreamerMethod()`
 */
export declare const StreamerMethod: () => (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => void;
export declare const Action: (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => void;
export declare function Cache(millisecond?: number): (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => void;
