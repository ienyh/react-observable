import 'reflect-metadata'

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
  return methodNames.map((method) => target[method])
}
