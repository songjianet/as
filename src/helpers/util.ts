const TYPE_TO_STRING = Object.prototype.toString

export function isDate(val: any): val is Date {
  return TYPE_TO_STRING.call(val) === '[object Date]'
}

export function isObject(val: any): val is Object {
  return val !== null && typeof val === 'object'
}

export function isPlainObject(val: any): val is Object {
  return TYPE_TO_STRING.call(val) === '[object Object]'
}
