let url = {
    homeInfo: '/homeInfo',
    category: '/cagoryList',
    addShopcart: '/addShopcart',
    setCount: '/setCount',
    shopCart: '/shopCart',
    deleteGood: '/removeGoods'
}

let baseUrl = 'http://rap2api.taobao.org/app/mock/12272'

for(let key in url){
    if(url.hasOwnProperty(key)){
        url[key] = baseUrl + url[key]
    }
}

export default url