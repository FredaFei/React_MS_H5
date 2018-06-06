import React, {Component} from 'react';

import ShopList from 'components/shopList'
import ShopcartFoot from 'components/shopcartFoot'
import './index.scss'



class Shopcart extends Component {
    componentWillReceiveProps(nextProps) {
        console.log('nextProps index')
        console.log(nextProps)
    }

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