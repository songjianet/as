import { AsRequestConfig, AsPromise, AsResponseConfig } from './types'
import { parseHeaders } from './helpers/headers'

/**
 * 处理请求，存储返回信息
 *
 * @param config {AsRequestConfig} 请求信息
 * @returns {AsPromise} promise格式的返回信息
 * @author songjianet
 */
export default function xhr(config: AsRequestConfig): AsPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers, responseType, timeout } = config

    const request = new XMLHttpRequest()

    // 设置超时
    if (timeout) {
      request.timeout = timeout
    }

    // 设置返回类型
    if (responseType) {
      request.responseType = responseType
    }

    // 打开请求
    request.open(method.toUpperCase(), url, true)

    // 包装返回数据
    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }

      if (request.status === 0) {
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
      handleResponse(response)
    }

    // 处理错误请求
    request.onerror = function handleError() {
      reject(new Error('Network Error!'))
    }

    // 处理超时请求
    request.ontimeout = function handleTimeout() {
      reject(new Error(`Timeout of ${timeout}ms exceeded!`))
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

    // 处理http状态码
    function handleResponse(res: AsResponseConfig): void {
      if (res.status >= 200 && res.status < 300) {
        resolve(res)
      } else {
        reject(new Error(`Request failed with status code ${res.status}!`))
      }
    }
  })
}
