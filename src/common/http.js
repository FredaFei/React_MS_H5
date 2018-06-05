import axios from 'axios';
import "./axiosMiddleware";

const post = (url,params={})=>{
    return new Promise((resolve,reject)=>{
        axios.post(url,params)
            .then(res=>{
                let {success,message} = res.data
                if(success === true){
                  console.log(res.data)
                    resolve(res.data)
                }
                reject(res.message)
            })
            .catch(error=>reject(error))
    })
}
const requestMiddleware = (fn)=>{
  return async(url,params)=>{
    try{
      return fn(url,params)
    }catch(err){
      throw err
    }
  }
}
export const http = requestMiddleware(post)