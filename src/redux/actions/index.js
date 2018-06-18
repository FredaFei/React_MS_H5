import {http} from '@/common/http'
import url from '@/common/apiServer'
import * as types from '../actionTypes/'
import {makeActionCreator} from './actionCreator'

export const getHomeInfo = () => {
    return async dispatch => {
        try {
            let result = await http(url.homeInfo)
            dispatch({
                type: types.GETHOME,
                homeInfo: result.data
            })
        } catch (err) {
            console.log(err)
        }
    }
}
export const getCategory = () => {
    return async dispatch => {
        try {
            let result = await http(url.category)
            dispatch({
                type: types.CATEGORY,
                categoryInfo: result.data
            })
        } catch (err) {
            console.log(err)
        }
    }
}
export const addShopcart = (goodId,count) => {
    return async dispatch => {
        try {
            await http(url.addShopcart, {goodId,count})
            dispatch({
                type: types.ADDSHOPCART
            })
        } catch (err) {
            console.log(err)
        }
    }
}
export const changeBuyCount = (skuId, count) => {
    return async dispatch => {
        try {
            await http(url.setCount, {skuId, count})
            dispatch({
                type: types.CHANGEBUYCOUNT,
                skuId,
                count
            })
        } catch (err) {
            console.log(err)
        }
    }
}
export const getShopcartList = () => {
    return async dispatch => {
        try {
            let result = await http(url.shopCart)
            let shopList = result.data.shopcartList
            shopList.forEach(item => {
                item.checked = false
                item.editing = false
                item.removechecked = false
                item.goods.forEach(good=>{
                    good.checked = false
                    good.editing = false
                    good.removechecked = false
                })
            })
            dispatch({
                type: types.SHOPCART,
                shopList
            })
        } catch (err) {
            console.log(err)
        }
    }
}
export const deleteGood = (skuIdArr) => {
    return async dispatch => {
        try {
            await http(url.deleteGood, {skuIdArr})
            dispatch({
                type: types.DELETEGOOD,
                skuIdArr
            })
        } catch (err) {
            console.log(err)
        }
    }
}

export const toggleGood = makeActionCreator(types.TOGGLEGOOD,'skuId')
export const toggleShop = makeActionCreator(types.TOGGLESHOP,'shopId')
export const shopChecked = makeActionCreator(types.ONECHECKEDSHOP,'shopId')
export const checkedAllShop = makeActionCreator(types.CHECKEDALLSHOP)
export const toggleEditStatus = makeActionCreator(types.TOGGLESTATUS,'shopId')
export const closeToast = makeActionCreator(types.TOGGLESTATUS)

