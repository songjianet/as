import as from '../../src'
import qs from 'qs'
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'

// document.cookie = 'a=b'
//
// as.get('/more/get').then(res => {
//   console.log(res)
// })
//
// as.post('http://127.0.0.1:8088/more/server2', {}, {
//   withCredentials: true // 是否允许携带跨域请求cookies
// }).then(res => {
//   console.log(res)
// })
//
// const instance = as.create({
//   xsrfCookieName: 'XSRF-TOKEN-D',
//   xsrfHeaderName: 'X-XSRF-TOKEN-D'
// })
//
// instance.get('/more/get').then(res => {
//   console.log(res)
// })


// test upload and download
// const instance = as.create()
//
// function calculatePercentage(loaded: number, total: number) {
//   return Math.floor(loaded * 1.0) / total
// }
//
// function loadProgressBar() {
//   const setupStartProgress = () => {
//     instance.interceptors.request.use(config => {
//       NProgress.start()
//       return config
//     })
//   }
//
//   const setupUpdataProgress = () => {
//     const update = (e: ProgressEvent) => {
//       console.log(e)
//       NProgress.set(calculatePercentage(e.loaded, e.total))
//     }
//     instance.defaults.onDownloadProgress = update
//     instance.defaults.onUploadProgress = update
//   }
//
//   const setupStopProgress = () => {
//     instance.interceptors.response.use(response => {
//       NProgress.done()
//       return response
//     }, error => {
//       NProgress.done()
//       return Promise.reject(error)
//     })
//   }
//
//   setupStartProgress()
//   setupUpdataProgress()
//   setupStopProgress()
// }
//
// loadProgressBar()
//
// const downloadEl = document.getElementById('download')
// downloadEl!.addEventListener('click', e => {
//   instance.get('https://cn.bing.com/sa/simg/SharedSpriteDesktop_2x_040919.png')
// })
//
// const uploadEl = document.getElementById('upload')
// uploadEl!.addEventListener('click', e => {
//   const data = new FormData()
//   const fileEl = document.getElementById('file') as HTMLInputElement
//   if (fileEl.files) {
//     data.append('file', fileEl.files[0])
//     instance.post('/more/upload', data)
//   }
// })

// as.post('/more/post', {
//   a: 1
// }, {
//   auth: {
//     username: 'songjianet',
//     password: '123456'
//   }
// }).then(res => {
//   console.log(res)
// })

// 参数序列化
// as.get('/more/get', {
//   params: new URLSearchParams('a=b&c=d')
// }).then(res => {
//   console.log(res)
// })
//
// as.get('/more/get', {
//   params: {
//     a: 1,
//     b: 2,
//     c: ['a', 'b', 'c']
//   }
// }).then(res => {
//   console.log(res)
// })
//
// const instance = as.create({
//   paramsSerializer(params) {
//     return qs.stringify(params, {arrayFormat: 'brackets'})
//   }
// })
//
// instance.get('/more/get', {
//   a: 1,
//   b: 2,
//   c: ['a', 'b', 'c']
// }).then(res => {
//   console.log(res)
// })

// baseURL
// const instance = as.create({
//   baseURL: 'https://www.bing.com/'
// })
//
// instance.get('https://www.bing.com/sa/simg/SharedSpriteDesktop_2x_040919.png')
//
// instance.get('rs/3Q/hT/ic/68e94a1b/d7ffd2fd.svg')

// static function extend
function getA() {
  return as.get('/more/A')
}

function getB() {
  return as.get('/more/B')
}

as.all([getA(), getB()]).then(as.spread(function(resA, resB) {
  console.log(resA.data)
  console.log(resB.data)
}))

as.all([getA(), getB()]).then(([resA, resB]) => {
  console.log(resA.data)
  console.log(resB.data)
})

const fakeConfig = {
  baseURL: 'https://www.baidu.com/',
  url: '/user/1023',
  params: {
    idClient: 1,
    idTest: 2,
    testString: 'this is a test'
  }
}

console.log(as.getUri(fakeConfig))
