const TYPE_TO_STRING = Object.prototype.toString

export function isDate(val: any): val is Date {
  return TYPE_TO_STRING.call(val) === '[object Date]'
}

export function isObject(val: any): val is Object {
  // 判断是否是object时候要同时对其是否为null进行判断，因为null也是object类型
  return val !== null && typeof val === 'object'
}
