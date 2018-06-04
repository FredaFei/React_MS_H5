import * as types from "@/actionTypes/";

const defaultState = [];

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.SHOPCART:
      return action.shopList;
    case types.TOGGLESHOP:
      return [...state, action.shopList];
    case types.TOGGLEGOOD:
      return [...state].map(item => {
        let temp = [];
        item.goods.forEach(good => {
          if (good.skuId === action.skuId) {
            temp.push({ ...good, checked: !good.checked });
          } else {
            temp.push(good);
          }
        });
        return { ...item, goods: temp };
      });
    // case types.ONECHECKEDSHOP:
    //   return [...state].map(item => {
    //     let temp = [];
    //     if (item.shopId === action.shopId) {
    //         item.goods.every(good=>good.checked)

    //       } else {
    //         temp.push(good);
    //       }
    //     item.goods.forEach(good => {
    //       if (item.shopId === action.shopId) {
    //           item[index]
    //         temp.push({ ...good, checked: !good.checked });
    //       } else {
    //         temp.push(good);
    //       }
    //     });
    //     return { ...item, goods: temp };
    //   });
    case types.SHOPTOGGLE:
      return [...state].map((item, index) => {
        let temp = [];
        let checked = false;
        if (item.shopId === action.shopId) {
          checked = !item.checked;
          item["goods"].forEach(good => {
            temp.push({ ...good, checked: checked });
          });
        } else {
          temp = item.goods;
        }
        return { ...item, checked, goods: temp };
      });
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
  return [...a].map((item, index) => {
    let temp = [];
    let checked = false;
    if (item.shopId === action.shopId) {
      checked = !item.checked;
      item["goods"].forEach(good => {
        temp.push({ ...good, checked: checked });
      });
    } else {
      temp.push(item.goods);
    }
    return { ...item, checked, goods: temp };
  });
}
x({ shopId: 9999 });
