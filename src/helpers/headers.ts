import { deepMerge, isPlainObject } from './util'
import { Method } from '../types'

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

/**
 * 将返回信息中的headers从字符串形式转换为对象形式
 *
 * @param headers {string} 返回信息中的headers字段
 * @returns {any} 处理后的headers对象
 * @author songjianet
 */
export function parseHeaders(headers: string): any {
  let parse = Object.create(null)
  if (!headers) {
    return parse
  }

  headers.split('\r\n').forEach(l => {
    let [key, val] = l.split(':')
    key = key.trim().toLowerCase()
    if (!key) {
      return
    }
    if (val) {
      val = val.trim()
    }
    parse[key] = val
  })

  return parse
}

export function flattenHeaders(headers: any, method: Method): any {
  if (!headers) {
    return headers
  }

  headers = deepMerge(headers.common, headers[method], headers)

  const methodToDelete = ['delete', 'get', 'head', 'options', 'put', 'patch', 'post', 'common']

  methodToDelete.forEach(m => {
    delete headers[m]
  })

  return headers
}
