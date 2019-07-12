import { isPlainObject } from './util'

/**
 * 将Content-Type统一改写成首字母大写形式
 *
 * @param headers {any} 请求头
 * @param normalizeName {string} Content-Type
 * @author songjianet
 */
function normalizeHeaderName(headers: any, normalizeName: string): void {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(keyName => {
    if (keyName !== normalizeName && keyName.toUpperCase() === normalizeName.toUpperCase()) {
      headers[normalizeName] = headers[keyName]
      delete headers[keyName]
    }
  })
}

/**
 * 处理请求头，通过判断请求参数是否是一个简单对象，如果是则默认Content-Type为
 * application/json;charset=utf-8
 *
 * @param headers {any} 请求头
 * @param data {any} 请求参数
 * @returns {any} 返回处理后的请求头
 * @author songjianet
 */
export function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type')

  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }

  return headers
}
