let url = {
    homeInfo: '/homeInfo',
    category: '/cagoryList',
    goodDetail: '/goodDetail',
    setCount: '/setCount',
    shopCart: '/shopCart',
    deleteGood: '/deleteGood',
    deleteMoreGoods: '/deleteMoreGoods'
}

let baseUrl = 'http://rap2api.taobao.org/app/mock/12272'

for(let key in url){
    if(url.hasOwnProperty(key)){
        url[key] = baseUrl + url[key]
    }
}

export default url