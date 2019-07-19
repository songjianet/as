import as from '../../src/index'

as.interceptors.request.use(config => {
  config.headers.test += '1'
  return config
})
as.interceptors.request.use(config => {
  config.headers.test += '2'
  return config
})
as.interceptors.request.use(config => {
  config.headers.test += '3'
  return config
})

as.interceptors.response.use(res => {
  res.data += '1'
  return res
})
let interceptor = as.interceptors.response.use(res => {
  res.data += '2'
  return res
})
as.interceptors.response.use(res => {
  res.data += '3'
  return res
})

as.interceptors.response.eject(interceptor)

as({
  url: '/interceptor/get',
  method: 'get',
  headers: {
    test: ''
  }
}).then((res) => {
  console.log(res.data)
})
