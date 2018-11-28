import axios from 'axios'
export  default  async ({url='', data='', method=''})=>{
  var qs = require('qs');
  let request = {
    method: method,
    url: url,
  }
  console.log(data)
  if (method === 'post'){
    request.data = qs.stringify(data, { allowDots: true })
  }else if(method === 'get'){
    request.params = qs.parse(data)
  }
  return new Promise((resolve,reject)=>{
    axios(request).then((resp)=>{
      resolve(resp)
    })
      .catch((error)=>{
        reject(error)
      })
  })
}
