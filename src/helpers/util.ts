const TYPE_TO_STRING = Object.prototype.toString

export function isDate(val: any): val is Date {
  return TYPE_TO_STRING.call(val) === '[object Date]'
}

export function isPlainObject(val: any): val is Object {
  return TYPE_TO_STRING.call(val) === '[object Object]'
}

export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }

  return to as T & U
}
