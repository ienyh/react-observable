import 'reflect-metadata'
import { Streamer } from '../middleware'

function SetMethodMetadata(key: string | Symbol | number, value: any) {
  return function (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    console.log(target, propertyKey, descriptor)
    Reflect.defineMetadata(key, value, target, propertyKey)
  }
}

const STREAMER_METADATA_KEY = Symbol('streamer_methods_with_metadata')
const StreamerSymbol = Symbol.for('@@streamer')

export const StreamerMethod =
  (flag = true) =>
  (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    SetMethodMetadata(StreamerSymbol, flag)
    const methods = Reflect.getMetadata(STREAMER_METADATA_KEY, target) || []
    methods.push(propertyKey)
    Reflect.defineMetadata(STREAMER_METADATA_KEY, methods, target)
  }

export function collectStreamers(target: Object) {
  const methodNames = Reflect.getMetadata(STREAMER_METADATA_KEY, target) || []
  return methodNames.map((method) => target[method]) as Array<Streamer>
}

export function Cache(duration: number = Infinity) {
  return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
    const isGetter = descriptor.get !== undefined;
    const originalMethod = isGetter ? descriptor.get : descriptor.value;
    const cacheKey = Symbol(`__cache__${String(propertyKey)}`);
    const cacheExpireKey = Symbol(`__cacheExpire__${String(propertyKey)}`);

    function applyCache(target: any, value: any) {
      target[cacheKey] = value;
      target[cacheExpireKey] = Date.now() + duration;
    }

    function isCacheValid(target: any): boolean {
      return target[cacheExpireKey] && (target[cacheExpireKey] > Date.now() || duration === Infinity);
    }

    if (isGetter) {
      descriptor.get = function () {
        if (isCacheValid(this)) {
          return this[cacheKey];
        }
        const result = originalMethod.apply(this);
        applyCache(this, result);
        return result;
      };
    } else {
      descriptor.value = function (...args: any[]) {
        if (isCacheValid(this)) {
          return this[cacheKey];
        }
        const result = originalMethod.apply(this, args);
        applyCache(this, result);
        return result;
      };
    }
  };
}

