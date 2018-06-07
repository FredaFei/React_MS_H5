import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {connect} from 'react-redux';
import * as actions from '@/actions/';

import Cell from 'components/cell/'
import ScrollBox from 'components/scrollBox/'
import ShopItem from 'components/shopItem.jsx'
import CopyRight from 'components/copyRight/'

const EmptyCart = () => {
    return (
        <div className="empty-shopcart">
            <p className="message">购物车快饿扁了T.T</p>
            <p className="wish">快给我挑点宝贝</p>
            <button className="go">去逛逛</button>
        </div>
    )
}

class ShopList extends Component {
    static propTypes = {
        shopcartList: PropTypes.array.isRequired,
        onGetShopcartList: PropTypes.func.isRequired
    }
    componentDidMount() {
        if (this.props.shopcartList.length === 0) {
            this.props.onGetShopcartList()
        }
    }
    render() {
        let {shopcartList} = this.props
        let content = null
        if (shopcartList.length === 0) {
            content = <EmptyCart/>
        } else {
            content = <div className="shop-content">
                {
                    shopcartList.map((shop, shopIndex) => <ShopItem shop={shop} key={shop.shopId}></ShopItem>)
                }
            </div>
        }
        return (
            <ScrollBox>
                <div className="shopcart-hd">
                    <Cell />
                </div>
                <div className="shopcart-bd">
                    {content}
                </div>
                <CopyRight/>
            </ScrollBox>
        )
    }
}


const mapStateToProps = (state) => {
    let {shopcart} = state
    let {shopcartList} = shopcart
    return {shopcartList}
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onGetShopcartList: () => dispatch(actions.getShopcartList()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ShopList)