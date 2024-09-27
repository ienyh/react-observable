import 'reflect-metadata';
import { InteropObservable, Observable, Subscription } from 'rxjs';
import { Streamer } from 'redux-observable-action';
export declare function SetMethodMetadata(key: string | Symbol | number, value: any): (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => void;
export declare const Init: (priority?: number) => (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => void;
/**
 * @internal
 */
export declare function preformInits(target: any): void;
export declare const From: <T>($: Observable<T> | InteropObservable<T>) => (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => void;
/**
 * @internal
 */
export declare function preformObservables(target: Object): Subscription;
/**
 * @deprecated
 * Use `@Action` instead of `@StreamerMethod()`
 */
export declare const StreamerMethod: () => (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => void;
export declare const Action: (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => void;
/**
 * @internal
 */
export declare function collectStreamers(target: Object): Array<Streamer>;
export declare function Cache(millisecond?: number): (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => void;
