import { isPlainObject, isDate } from './util'

interface URLOrigin {
  protocol: string
  host: string
}

/**
 * 对URL参数中的特殊符号进行encode处理
 *
 * @param val {string} URL参数的key或value
 * @param {string} 返回处理特殊字符后的字符串
 * @author songjianet
 */
function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

/**
 * 处理请求URL，包括对特殊字符、哈希和参数拼接的处理
 *
 * @param url {string} 请求地址
 * @param params {any} 可选的请求参数
 * @returns {string} 处理后的URL字符串
 * @author songjianet
 */
export function buildURL(url: string, params?: any): string {
  if (!params) {
    return url
  }

  const parts: string[] = []

  Object.keys(params).forEach(k => {
    const val = params[k]
    if (val === null || typeof val === 'undefined') {
      return
    }

    let values = []
    if (Array.isArray(val)) {
      values = val
      k += '[]'
    } else {
      values = [val]
    }

    values.forEach(v => {
      if (isDate(v)) {
        v = v.toISOString()
      } else if (isPlainObject(val)) {
        v = JSON.stringify(v)
      }
      parts.push(`${encode(k)}=${encode(v)}`)
    })
  })

  let serializedParams = parts.join('&')
  if (serializedParams) {
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}

export function isURLSameOrigin(requestURL: string): boolean {
  const parsedOrigin = resolveURL(requestURL)
  return (
    parsedOrigin.protocol === currentOrigin.protocol && parsedOrigin.host === currentOrigin.host
  )
}

const urlParsingNode = document.createElement('a')
const currentOrigin = resolveURL(window.location.href)

function resolveURL(url: string): URLOrigin {
  urlParsingNode.setAttribute('href', url)
  const { protocol, host } = urlParsingNode
  return { protocol, host }
}
