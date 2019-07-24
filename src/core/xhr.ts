import { AsRequestConfig, AsPromise, AsResponseConfig } from '../types'
import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'

/**
 * 处理请求，存储返回信息
 *
 * @param config {AsRequestConfig} 请求信息
 * @returns {AsPromise} promise格式的返回信息
 * @author songjianet
 */
export default function xhr(config: AsRequestConfig): AsPromise {
  return new Promise((resolve, reject) => {
    const {
      data = null,
      url,
      method = 'get',
      headers,
      responseType,
      timeout,
      cancelToken,
      withCredentials
    } = config

    const request = new XMLHttpRequest()

    // 设置超时
    if (timeout) {
      request.timeout = timeout
    }

    // 设置返回类型
    if (responseType) {
      request.responseType = responseType
    }

    if (withCredentials) {
      request.withCredentials = withCredentials
    }

    // 打开请求
    request.open(method.toUpperCase(), url!, true)

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
      reject(createError('Network Error!', config, null, request))
    }

    // 处理超时请求
    request.ontimeout = function handleTimeout() {
      reject(createError(`Timeout of ${timeout}ms exceeded!`, config, 'ECONNABORTED', request))
    }

    // 处理请求头
    Object.keys(headers).forEach(n => {
      if (data === null && n.toLowerCase() === 'content-type') {
        delete headers[n]
      } else {
        request.setRequestHeader(n, headers[n])
      }
    })

    if (cancelToken) {
      cancelToken.promise.then(reason => {
        request.abort()
        reject(reason)
      })
    }

    // 发送请求
    request.send(data)

    // 处理http状态码
    function handleResponse(res: AsResponseConfig): void {
      if (res.status >= 200 && res.status < 300) {
        resolve(res)
      } else {
        reject(
          createError(`Request failed with status code ${res.status}!`, config, null, request, res)
        )
      }
    }
  })
}
