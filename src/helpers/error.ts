import { AsRequestConfig, AsResponseConfig } from '../types'

export class AsError extends Error {
  isAsError: boolean
  config: AsRequestConfig
  code?: string | null
  request?: any
  response?: AsResponseConfig

  /* istanbul ignore next */
  constructor(
    message: string,
    config: AsRequestConfig,
    code?: string | null,
    request?: any,
    response?: AsResponseConfig
  ) {
    super(message)

    this.isAsError = true
    this.config = config
    this.code = code
    this.request = request
    this.response = response

    Object.setPrototypeOf(this, AsError.prototype)
  }
}

// 工厂函数
export function createError(
  message: string,
  config: AsRequestConfig,
  code?: string | null,
  request?: any,
  response?: AsResponseConfig
) {
  const error = new AsError(message, config, code, request, response)
  return error
}
