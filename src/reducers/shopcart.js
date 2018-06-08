import * as types from "@/actionTypes/";
import {shopChecked} from "../actions";

function updataState(oldState, newValue,...rest) {
    return Object.assign({}, oldState, newValue,...rest)
}

function updateItemArray(array, itemId, updateItemCallback) {
    const updateItems = array.map(item => {
        if (item.shopId !== itemId) {
            return item
        }
        const updateItem = updateItemCallback(item)
        return updateItem
    })
    return updateItems
}

// updateItemArray(tempShopList,action.shopId,item=>{
//     return item.goods.map(good=> ({...good,checked:!item.checked}))
// })
const defaultState = {
    editing: false,
    shopcartList: []
};

export default (state = defaultState, action) => {
    let tempShopList = [...state.shopcartList];
    switch (action.type) {
        case types.SHOPCART:
            return updataState(state, {shopcartList: action.shopList});
        case types.TOGGLEGOOD:
            return updataState(state, {
                shopcartList: tempShopList.map(shop => {
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
        case types.TOGGLESHOP:
            return updataState(state, {
                shopcartList: tempShopList.map((shop, index) => {
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
        case types.CHECKEDALLSHOP:
            let isAll = tempShopList.every(shop =>shop.checked);
            let checked = !isAll
            return updataState(state, {
                shopcartList: tempShopList.map(shop => {
                    return {...shop,checked,
                        goods: shop.goods.map(good => {
                            return {...good,checked}
                        })
                    };
                })
            });
        case types.TOGGLESTATUS:
            return updataState(state,{editing:!state.editing},{
                shopcartList: tempShopList.map(shop => {
                    if (shop.shopId !== action.shopId) {
                        return shop
                    }
                    let editing = !shop.editing;
                    return Object.assign({},shop,{editing}, {
                        goods: shop.goods.map(good => {
                            return {...good, editing}
                        })
                    });
                })
            });
        case types.DELETEGOOD:
           var shopcartList = [];
            tempShopList.forEach(shop => {
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
        case types.CHANGEBUYCOUNT:
            return updataState(state,{
                shopcartList: tempShopList.map(shop => {
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
        default:
            return state;
    }
};

// var obj = {
//     edit: false,
//     a: [
//         {
//             shopId: 10000,
//             shopName: "线结却族之改表",
//             goods: [
//                 {
//                     skuId: 465,
//                     goodName: "店铺名字",
//                     skuDesc: "【店铺名字】产品描述展位富豪啦阿里阿拉哦破两",
//                     skuText: "物运间相层而专知到了技影共标这界状直红这清很清示众住林平划建原时方北知行",
//                     price: 925,
//                     count: 12,
//                     maxCount: 42,
//                     stock: 38,
//                     imgUrl: "http://dummyimage.com/300x300/530"
//                 },
//                 {
//                     skuId: 631,
//                     goodName: "店铺名字",
//                     skuDesc: "【店铺名字】产品描述展位富豪啦阿里阿拉哦破两",
//                     skuText: "器法千有置对候即电己经式半中于立达统社第电正",
//                     price: 634,
//                     count: 8,
//                     maxCount: 36,
//                     stock: 90,
//                     imgUrl: "http://dummyimage.com/300x300/530"
//                 }
//             ]
//         },
//         {
//             shopId: 9999,
//             shopName: "代走制比反外什毛低只",
//             goods: [
//                 {
//                     skuId: 162,
//                     goodName: "店铺名字",
//                     skuDesc: "【店铺名字】产品描述展位富豪啦阿里阿拉哦破两",
//                     skuText: "只示解起委到关报江候热两需向料型一学用和非米及",
//                     price: 245,
//                     count: 3,
//                     maxCount: 34,
//                     stock: 37,
//                     imgUrl: "http://dummyimage.com/300x300/530"
//                 }
//             ]
//         },
//         {
//             shopId: 999,
//             shopName: "道委象列层理处为历",
//             goods: [
//                 {
//                     skuId: 376,
//                     goodName: "店铺名字",
//                     skuDesc: "【店铺名字】产品描述展位富豪啦阿里阿拉哦破两",
//                     skuText: "界这定约亲状水切里那速下然影名装治",
//                     price: 403,
//                     count: 8,
//                     maxCount: 36,
//                     stock: 63,
//                     imgUrl: "http://dummyimage.com/300x300/530"
//                 },
//                 {
//                     skuId: 957,
//                     goodName: "店铺名字",
//                     skuDesc: "【店铺名字】产品描述展位富豪啦阿里阿拉哦破两",
//                     skuText: "较交布和铁识家石路头增说儿又被接越此支收清",
//                     price: 223,
//                     count: 12,
//                     maxCount: 8,
//                     stock: 13,
//                     imgUrl: "http://dummyimage.com/300x300/530"
//                 }
//             ]
//         }
//     ]
// };

// obj.a.forEach(item => {
//     item.checked = false;
//     item.editing = false;
//     item.removechecked = false;
//     item.goods.forEach(good => {
//         good.checked = false;
//         good.editing = false;
//         good.removechecked = false;
//     });
// });

// function x(action) {
//     let isAll = obj.a.every(shop =>shop.checked);
//     let checked = !isAll
//     return Object.assign({}, obj, {
//         shopcartList: obj.a.map((shop, index) => {
//             return Object.assign({}, shop, {
//                 goods: shop.goods.map(good => {
//                     return Object.assign({}, good, {checked})
//                 })
//             });
//         })
//     })
// }

// x();
