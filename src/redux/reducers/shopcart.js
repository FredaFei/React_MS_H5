import * as types from "../actionTypes/";
import {shopChecked} from "../actions/";

function updataState(oldState, newValue,...rest) {
    return Object.assign({}, oldState, newValue,...rest)
}

const defaultState = {
    editing: false,
    shopcartList: []
};

function toggleGood(state,action) {
    return updataState(state, {
        shopcartList: state.shopcartList.map(shop => {
            let goods = shop.goods.map(good => {
                if (good.skuId !== action.skuId) {
                    return good
                }
                return {...good,checked: !good.checked}
            })
            return {
                ...shop,
                goods,
                checked: goods.every(item => item.checked)
            };
        })
    });
}
function toggleShop(state,action) {
    return updataState(state, {
        shopcartList: state.shopcartList.map((shop, index) => {
            if (shop.shopId !== action.shopId) {
                return shop
            }
            let checked = !shop.checked;
            return Object.assign({}, shop, {
                checked,
                goods: shop.goods.map(good => {
                    return {...good,checked}
                })
            });
        })
    });
}
function toggleAllShop(state,action) {
    let isAll = state.shopcartList.every(shop =>shop.checked);
    let checked = !isAll
    return updataState(state, {
        shopcartList: state.shopcartList.map(shop => {
            return {...shop,checked,
                goods: shop.goods.map(good => {
                    return {...good,checked}
                })
            };
        })
    });
}
function toggleStatus(state,action) {
    return updataState(state,{editing:!state.editing},{
        shopcartList: state.shopcartList.map(shop => {
            let removechecked = !shop.removechecked;
            if (shop.shopId !== action.shopId) {
                return Object.assign({},shop,{removechecked})
            }
            let editing = !shop.editing;
            return Object.assign({},shop,{editing}, {
                goods: shop.goods.map(good => {
                    return {...good, editing}
                })
            });
        })
    });
}

function deleteGood(state,action) {
    var shopcartList = [];
    state.shopcartList.forEach(shop => {
        var goods = shop.goods.filter((good, index) => {
            if (!action.skuIdArr.includes(good.skuId)) {
                return good;
            }
        });
        if (goods.length > 0) {
            shopcartList.push({...shop, goods});
        }
    });
    return updataState({...state, shopcartList});
}

function changeBuyCount(state,action) {
    return updataState(state,{
        shopcartList: state.shopcartList.map(shop => {
            return {
                ...shop,
                goods: shop.goods.map(good => {
                    if (good.skuId !== action.skuId) {
                        return good
                    }
                    return {...good, count: action.count}
                })
            }
        })
    });
}
export default (state = defaultState, action) => {
    let tempShopList = [...state.shopcartList];
    switch (action.type) {
        case types.SHOPCART: return updataState(state, {shopcartList: action.shopList});
        case types.TOGGLEGOOD: return toggleGood(state,action)
        case types.TOGGLESHOP: return toggleShop(state,action)
        case types.CHECKEDALLSHOP: return toggleAllShop(state,action)
        case types.TOGGLESTATUS: return toggleStatus(state,action)
        case types.DELETEGOOD: return deleteGood(state,action)
        case types.CHANGEBUYCOUNT: return changeBuyCount(state,action)
        default:
            return state;
    }
};