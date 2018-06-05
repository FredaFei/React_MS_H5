import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {connect} from 'react-redux';
import * as actions from '@/actions/';

import Cell from 'components/cell/'
import Controller from 'components/controller/'

import { Modal } from "antd-mobile";
const alert = Modal.alert;

class ShopName extends Component {
    static propTypes = {
        shop: PropTypes.object.isRequired
    }
    state = {
        shopChecked: false
    }
    componentWillReceiveProps(nextProps){
        console.log('nextProps shopname')
        console.log(nextProps)
        let {shop} = nextProps
        var shopChecked = shop.goods.every(good=>good.checked)
        this.setState({shopChecked})
    }
    toggleShopFn = (e) => {
        let {shop} = this.props
        let shopChecked = e.target.checked
        this.props.onToggleShop(shop.shopId)
        this.setState({shopChecked})
    }
    changeEditStatusFn = () => {
        let {shop} = this.props
        this.props.onToggleStatus(shop.shopId)
    }
    render() {
        let {shopChecked} = this.state
        let {shop} = this.props
        let editText = shop.editing ? '完成': '编辑'
        return (
            <div className="shop-name">
                <div className="left">
                    <div className="checkbox">
                        <label
                            className={classnames({'active': shopChecked})}>
                            <input type="checkbox"
                                   checked={shopChecked}
                                   onChange={this.toggleShopFn}/>
                        </label>
                    </div>
                    <i className="icon-category"></i>
                    <span className="name">{shop.shopName}</span>
                </div>
                <span className="oprator" onClick={this.changeEditStatusFn}>{editText}</span>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onToggleShop: (shopId) => dispatch(actions.shopToggle(shopId)),
        onToggleStatus: (shopId) => dispatch(actions.toggleEditStatus(shopId)),
    }
}
export default connect(null, mapDispatchToProps)(ShopName)