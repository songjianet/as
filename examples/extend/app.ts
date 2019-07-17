import as from '../../src/index'

as({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'hi'
  }
})

as.request({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'hello'
  }
})

as.get('/extend/get')

as.options('/extend/options')

as.delete('/extend/delete')

as.head('/extend/head')

as.post('/extend/post', { msg: 'post' })

as.put('/extend/put', { msg: 'put' })

as.patch('/extend/patch', { msg: 'patch' })

as('/extend/post', {
  method: 'post',
  data: {
    msg: 'hi'
  }
})
