import { AsRequestConfig, AsPromise } from './types'
import { buildURL } from './helpers/url'
import { transformRequest } from './helpers/data'
import { processHeaders } from './helpers/headers'
import xhr from './xhr'

/**
 * 接收请求信息
 *
 * @param config {object} 请求信息
 * @returns AsPromise {object} promise格式的返回信息
 * @author songjianet
 */
function as(config: AsRequestConfig): AsPromise {
  processConfig(config)
  return xhr(config)
}

/**
 * 处理请求信息
 *
 * @param config {object} 请求信息
 * @author songjianet
 */
function processConfig(config: AsRequestConfig): void {
  config.url = transformURL(config)
  config.headers = transformHeader(config)
  config.data = transformRequestData(config)
}

/**
 * 处理URL
 *
 * @param config {object} 请求信息
 * @returns {string} 处理后的URL
 * @author songjianet
 */
function transformURL(config: AsRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

/**
 * 处理data参数
 *
 * @param config {object} 请求信息
 * @returns {any} 处理后的data
 * @author songjianet
 */
function transformRequestData(config: AsRequestConfig): any {
  return transformRequest(config.data)
}

/**
 * 处理请求头
 *
 * @param config {object} 请求信息
 * @returns {any} 返回处理后的信息
 * @author songjianet
 */
function transformHeader(config: AsRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

export default as
