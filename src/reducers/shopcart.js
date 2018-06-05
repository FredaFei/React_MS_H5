import * as types from "@/actionTypes/";
import {shopChecked} from "../actions";

const defaultState = {
    edit: false,
    shopcartList: []
};

export default (state = defaultState, action) => {
    let tempShopList = [...state.shopcartList]
    switch (action.type) {
        case types.SHOPCART:
            return {...state, shopcartList: action.shopList};
        case types.TOGGLEGOOD:
            var shopcartList = tempShopList.map(item => {
                let temp = [];
                item.goods.forEach(good => {
                    if (good.skuId === action.skuId) {
                        temp.push({...good, checked: !good.checked});
                    } else {
                        temp.push(good);
                    }
                });
                let checked = temp.every(item => item.checked)
                return {...item, checked, goods: temp};
            });
            return {...state,shopcartList}
        case types.SHOPTOGGLE:
            var shopcartList = tempShopList.map((item, index) => {
                let temp = [];
                let checked = item.checked
                if (item.shopId === action.shopId) {
                    checked = !item.checked;
                    item.goods.forEach(good => {
                        temp.push({...good, checked});
                    });
                } else {
                    temp = item.goods;
                }
                return {...item, checked, goods: temp};
            });
            return {...state,shopcartList}
        case types.CHECKEDALLSHOP:
            let isAll = tempShopList.every(item => item.goods.every(good => good.checked))
            var shopcartList = tempShopList.map((item, index) => {
                let temp = [];
                let checked = !isAll
                item.goods.forEach(good => {
                    temp.push({...good, checked});
                });
                return {...item, checked, goods: temp};
            });
            return {...state,shopcartList}
        case types.TOGGLESTATUS:
            var shopcartList = tempShopList.map(shop=>{
                let temp = [];
                let editing = shop.editing
                if(shop.shopId === action.shopId){
                    editing = !shop.editing
                    shop.goods.forEach(good=>{
                        temp.push({...good, editing});
                    })
                }else{
                    temp = shop.goods;
                }
                return {...shop, editing, goods: temp};
            })
            return {...state,shopcartList}
        case types.DELETEGOOD:
            var shopcartList = []
            tempShopList.forEach(shop=>{
                let temp = [];
                shop.goods.forEach((good,index)=>{
                    if(!action.skuIdArr.includes(good.skuId)){
                        temp.push(good)
                    }
                })
                shop.goods = temp
                if(temp.length>0){
                    shopcartList.push(shop)
                }
            })
            return {...state,shopcartList}
        default:
            return state;
    }
};

var a = [
    {
        shopId: 10000,
        shopName: "线结却族之改表",
        goods: [
            {
                skuId: 465,
                goodName: "店铺名字",
                skuDesc: "【店铺名字】产品描述展位富豪啦阿里阿拉哦破两",
                skuText: "物运间相层而专知到了技影共标这界状直红这清很清示众住林平划建原时方北知行",
                price: 925,
                count: 12,
                maxCount: 42,
                stock: 38,
                imgUrl: "http://dummyimage.com/300x300/530"
            },
            {
                skuId: 631,
                goodName: "店铺名字",
                skuDesc: "【店铺名字】产品描述展位富豪啦阿里阿拉哦破两",
                skuText: "器法千有置对候即电己经式半中于立达统社第电正",
                price: 634,
                count: 8,
                maxCount: 36,
                stock: 90,
                imgUrl: "http://dummyimage.com/300x300/530"
            }
        ]
    },
    {
        shopId: 9999,
        shopName: "代走制比反外什毛低只",
        goods: [
            {
                skuId: 162,
                goodName: "店铺名字",
                skuDesc: "【店铺名字】产品描述展位富豪啦阿里阿拉哦破两",
                skuText: "只示解起委到关报江候热两需向料型一学用和非米及",
                price: 245,
                count: 3,
                maxCount: 34,
                stock: 37,
                imgUrl: "http://dummyimage.com/300x300/530"
            }
        ]
    },
    {
        shopId: 999,
        shopName: "道委象列层理处为历",
        goods: [
            {
                skuId: 376,
                goodName: "店铺名字",
                skuDesc: "【店铺名字】产品描述展位富豪啦阿里阿拉哦破两",
                skuText: "界这定约亲状水切里那速下然影名装治",
                price: 403,
                count: 8,
                maxCount: 36,
                stock: 63,
                imgUrl: "http://dummyimage.com/300x300/530"
            },
            {
                skuId: 957,
                goodName: "店铺名字",
                skuDesc: "【店铺名字】产品描述展位富豪啦阿里阿拉哦破两",
                skuText: "较交布和铁识家石路头增说儿又被接越此支收清",
                price: 223,
                count: 12,
                maxCount: 8,
                stock: 13,
                imgUrl: "http://dummyimage.com/300x300/530"
            }
        ]
    }
];

a.forEach(item => {
    item.checked = false;
    item.removechecked = false;
    item.goods.forEach(good => {
        good.checked = false;
        good.removechecked = false;
    });
});

function x(action) {
    let result = []
    var shopcartList = [...a].forEach((shop,shopIndex)=>{
        let temp = [];
        shop.goods.forEach((good,index)=>{
            if(!action.skuIdArr.includes(good.skuId)){
                temp.push(good)
            }
        })
        shop.goods = temp
        if(temp.length>0){
            result.push(shop)
        }
    })
    return result
}

x({skuIdArr: [162,376]});
