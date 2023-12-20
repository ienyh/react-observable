import 'reflect-metadata';
import { Streamer } from '../middleware';
export declare const StreamerMethod: (flag?: boolean) => (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => void;
export declare function collectStreamers(target: Object): Streamer<import("redux").Action>[];
export declare function Cache(duration?: number): (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => void;
