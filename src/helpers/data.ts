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

/**
 * 处理返回的信息中data字段在没有规定responseType为json时候的字符串问题
 *
 * @param data {any} 返回信息中的data的数据
 * @returns {any} 返回处理后的data
 * @author songjianet
 */
export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      // do nothing
    }
  }
  return data
}
