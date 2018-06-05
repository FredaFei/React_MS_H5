import {http} from '../common/http'
import url from '../common/apiServer'
import * as types from '../actionTypes/'

import {Toast} from "antd-mobile";

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
export const getGoodDetail = (goodId) => {
    return async dispatch => {
        try {
            let result = await http(url.goodDetail, {goodId})
            dispatch({
                type: types.GOODETAIL,
                goodDetail: result.data
            })
        } catch (err) {
            console.log(err)
        }
    }
}
export const changeBuyCount = (goodId, count) => {
    return async dispatch => {
        try {
            let result = await http(url.setCount, {goodId, count})
            dispatch({
                type: types.CHANGEBUYCOUNT,
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

export const toggleGood = (skuId) =>{
    return{
        type: types.TOGGLEGOOD,
        skuId
    }
}
export const toggleShop = (shopId) =>({
    type: types.TOGGLESHOP,
    shopId
})
export const shopChecked = (shopId) =>({
    type: types.ONECHECKEDSHOP,
    shopId
})
export const shopToggle = (shopId) =>({
    type: types.SHOPTOGGLE,
    shopId
})
export const checkedAllShop = () =>({
    type: types.CHECKEDALLSHOP
})
export const toggleEditStatus = (shopId) =>({
    type: types.TOGGLESTATUS,
    shopId
})
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
