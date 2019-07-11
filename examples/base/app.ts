import as from '../../src/index'

as({
  method: 'get',
  url: '/base/get',
  params: {
    foo: ['bar', 'baz']
  }
})

as({
  method: 'get',
  url: '/base/get',
  params: {
    foo: {
      bar: 'baz'
    }
  }
})

const date = new Date()

as({
  method: 'get',
  url: '/base/get',
  params: {
    date
  }
})

as({
  method: 'get',
  url: '/base/get',
  params: {
    foo: '@:$, '
  }
})

as({
  method: 'get',
  url: '/base/get',
  params: {
    foo: 'bar',
    baz: null
  }
})

as({
  method: 'get',
  url: '/base/get#hash',
  params: {
    foo: 'bar'
  }
})

as({
  method: 'get',
  url: '/base/get?foo=bar',
  params: {
    bar: 'baz'
  }
})
