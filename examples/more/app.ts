import as from '../../src'
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

as.post('/more/post', {
  a: 1
}, {
  auth: {
    username: 'songjianet',
    password: '123456'
  }
}).then(res => {
  console.log(res)
})
