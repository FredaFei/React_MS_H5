import React from 'react';

import ShopList from './components/shopList'
import ShopcartFoot from './components/shopcartFoot'
import './index.scss'


const Shopcart = ()=>{
    return (
        <div className="shopcart-wrap">
            <ShopList />
            <ShopcartFoot />
        </div>
    )
}

export default Shopcart