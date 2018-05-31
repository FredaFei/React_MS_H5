import {http} from '../common/http'
import url from '../common/apiServer'
import * as types from '../actionTypes/'

import { Toast } from "antd-mobile";

export const getHomeInfo = ()=>{
  return async dispatch=>{
    try{
      let result = await http(url.homeInfo)
      dispatch({
        type: types.GETHOME,
        homeInfo: result.data
      })
    }catch(err){
      console.log(err)
    }
  }
}
export const getCategory = ()=>{
  return async dispatch=>{
    try{
      let result = await http(url.category)
      dispatch({
        type: types.CATEGORY,
        categoryInfo: result.data
      })
    }catch(err){
      console.log(err)
    }
  }
} 
export const getGoodDetail = (goodId)=>{
  return async dispatch=>{
    try{
      let result = await http(url.goodDetail,{goodId})
      dispatch({
        type: types.GOODETAIL,
        goodDetail: result.data
      })
    }catch(err){
      console.log(err)
    }
  }
} 
export const changeBuyCount = (goodId,count)=>{
  return async dispatch=>{
    try{
      let result = await http(url.setCount,{goodId,count})
      dispatch({
        type: types.CHANGEBUYCOUNT,
        count
      })
    }catch(err){
      console.log(err)
    }
  }
} 
export const getShopcartList = ()=>{
  return async dispatch=>{
    try{
      let result = await http(url.shopCart)
      console.log(result)
      dispatch({
        type: types.SHOPCART,
        shopList: result.data.shopcartList
      })
    }catch(err){
      console.log(err)
    }
  }
} 