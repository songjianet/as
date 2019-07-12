import { AsRequestConfig, AsPromise, AsResponseConfig } from './types'
import { parseHeaders } from './helpers/headers'

/**
 * 发送请求
 *
 * @param config {AsRequestConfig} 请求信息
 * @returns {AsPromise} promise格式的返回信息
 * @author songjianet
 */
export default function xhr(config: AsRequestConfig): AsPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers, responseType } = config

    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    // 设置请求信息
    request.open(method.toUpperCase(), url, true)

    // 包装返回数据
    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }
      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData = responseType !== 'text' ? request.response : request.responseText
      const response: AsResponseConfig = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      resolve(response)
    }

    // 处理错误请求
    request.onerror = function handleError() {
      reject(new Error('Network Error!'))
    }

    // 处理请求头
    Object.keys(headers).forEach(n => {
      if (data === null && n.toLowerCase() === 'content-type') {
        delete headers[n]
      } else {
        request.setRequestHeader(n, headers[n])
      }
    })

    // 发送请求
    request.send(data)
  })
}
