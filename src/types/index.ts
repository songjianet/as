export type Method =
  | 'get'
  | 'GET'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'
  | 'delete'
  | 'DELETE'
  | 'options'
  | 'OPTIONS'
  | 'head'
  | 'HEAD'

export interface AsRequestConfig {
  url: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}

export interface AsResponseConfig {
  data: any
  status: number
  statusText: string
  headers: any
  config: AsRequestConfig
  request: any
}

export interface AsPromise extends Promise<AsResponseConfig> {}

export interface AsError extends Error {
  isAsError: boolean
  config: AsRequestConfig
  code?: string | null
  request?: any
  response: AsResponseConfig
}
