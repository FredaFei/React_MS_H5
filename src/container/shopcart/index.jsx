import React, {Component} from 'react';

import ShopList from 'components/shopList'
import ShopcartFoot from 'components/shopcartFoot'
import './index.scss'



class Shopcart extends Component {
    render() {
        return (
            <div className="shopcart-wrap">
                <ShopList />
                <ShopcartFoot />
            </div>
        );

    }
}


export default Shopcart