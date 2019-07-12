import { isPlainObject } from './util'

/**
 * 处理data请求参数，通过判断data是否是一个简单对象，如果是则对其进行字符串的转换，否则直接
 * 返回data
 *
 * @param data {any} 请求参数
 * @returns {any} 返回处理后的data
 * @author songjianet
 */
export function transformRequest(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}
