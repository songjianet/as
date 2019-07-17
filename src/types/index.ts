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
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}

export interface AsResponseConfig<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AsRequestConfig
  request: any
}

export interface AsPromise<T = any> extends Promise<AsResponseConfig<T>> {}

export interface AsError extends Error {
  isAsError: boolean
  config: AsRequestConfig
  code?: string | null
  request?: any
  response: AsResponseConfig
}

export interface As {
  request<T = any>(config: AsRequestConfig): AsPromise<T>

  get<T = any>(url: string, config?: AsRequestConfig): AsPromise<T>

  delete<T = any>(url: string, config?: AsRequestConfig): AsPromise<T>

  head<T = any>(url: string, config?: AsRequestConfig): AsPromise<T>

  options<T = any>(url: string, config?: AsRequestConfig): AsPromise<T>

  post<T = any>(url: string, data?: any, config?: AsRequestConfig): AsPromise<T>

  put<T = any>(url: string, data?: any, config?: AsRequestConfig): AsPromise<T>

  patch<T = any>(url: string, data?: any, config?: AsRequestConfig): AsPromise<T>
}

export interface AsInstance extends As {
  (config: AsRequestConfig): AsPromise

  (url: string, config?: AsRequestConfig): AsPromise
}
