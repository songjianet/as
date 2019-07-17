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

interface ResponseData<T = any> {
  code: number
  result: T
  message: string
}

interface User {
  name: string
  age: number
}

function getUser<T>() {
  // @ts-ignore
  return as<ResponseData<T>>('/extend/user')
    .then((res: { data: any; }) => res.data)
    .catch((err: any) => console.error(err))
}


async function test() {
  const user = await getUser<User>()
  if (user) {
    console.log(user.result.name)
  }
}

test()
