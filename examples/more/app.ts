import as from '../../src'

document.cookie = 'a=b'

as.get('/more/get').then(res => {
  console.log(res)
})

as.post('http://127.0.0.1:8088/more/server2', {}, {
  withCredentials: true // 是否允许携带跨域请求cookies
}).then(res => {
  console.log(res)
})
