import { AsRequestConfig } from './types'
import { buildURL } from './helpers/url'
import { transformRequest } from './helpers/data'
import xhr from './xhr'

/**
 * 接收as请求信息
 * @author songjian
 */
function as(config: AsRequestConfig): void {
  processConfig(config)
  xhr(config)
}

function processConfig(config: AsRequestConfig): void {
  config.url = transformURL(config)
  config.data = transformRequestData(config)
}

function transformURL(config: AsRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

function transformRequestData(config: AsRequestConfig): any {
  return transformRequest(config.data)
}

export default as
