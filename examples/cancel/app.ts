import as, { Canceler } from '../../src'

const CancelToken = as.CancelToken
const source = CancelToken.source()

as.get('/cancel/get', {
  cancelToken: source.token
}).catch(function(e) {
  if (as.isCancel(e)) {
    console.log('Request canceled', e.message)
  }
})

setTimeout(() => {
  source.cancel('Operation canceled by the user.')

  as.post('/cancel/post', { a: 1 }, { cancelToken: source.token }).catch(function(e) {
    if (as.isCancel(e)) {
      console.log( e.message)
    }
  })
}, 100)

let cancel: Canceler

as.get('/cancel/get', {
  cancelToken: new CancelToken(c => {
    cancel = c
  })
}).catch(function(e) {
  if (as.isCancel(e)) {
    console.log('Request canceled')
  }
})

setTimeout(() => {
  cancel()
}, 200)
