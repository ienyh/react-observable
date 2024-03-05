import 'reflect-metadata';
import { InteropObservable, Observable, Subscription } from 'rxjs';
import { Streamer } from 'redux-observable-action';
export declare function SetMethodMetadata(key: string | Symbol | number, value: any): (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => void;
export declare const From: <T>($: Observable<T> | InteropObservable<T>) => (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => void;
export declare function preformObservables(target: Object): Subscription;
export declare const StreamerMethod: () => (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => void;
export declare function collectStreamers(target: Object): Streamer<import("redux").Action>[];
export declare function Cache(duration?: number): (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => void;
