import React, {Component} from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import {connect} from "react-redux";
import * as actions from '@/redux/actions/'

import ShopDeleteItem from "components/shopDeleteItem/";
import Controller from "components/controller/";
import ShopName from "./shopName";
import {Modal} from "antd-mobile";
const alert = Modal.alert;

const ShopEditItem = ({good, toggleGoodsFn, deleteGoodsFn, onChangeNum}) => {
    return (
        <div className="shopcartgood-list" key={good.skuId}>
            <div className="item-content">
                <div className="checkbox">
                    <label className={classnames({active: good.checked})}>
                        <input type="checkbox" onChange={toggleGoodsFn}/>
                    </label>
                </div>
                <img src={good.imgUrl} alt=""/>
                <div className="info">
                    <Controller stock={good.stock}
                                buyCount={good.count}
                                maxCount={good.maxCount}
                                onChangeNum={onChangeNum}/>
                    <div className="sku">
                        <div className="price">￥{good.price}</div>
                        <div className="quantity">x{good.count}</div>
                    </div>
                </div>
                <div className="del-btn" onClick={deleteGoodsFn}>删除</div>
            </div>
        </div>
    )
}
const ShopGoodItem = ({good, deleteGoodsFn, toggleGoodsFn}) => {
    return (
        <ShopDeleteItem key={good.skuId} onSlideDeleteGood={deleteGoodsFn}>
            <div className="shopcartgood-list">
                <div className="item-content">
                    <div className="checkbox">
                        <label className={classnames({active: good.checked})}>
                            <input type="checkbox" onChange={toggleGoodsFn}/>
                        </label>
                    </div>
                    <img src={good.imgUrl} alt=""/>
                    <div className="info">
                        <div className="name">{good.skuDesc}</div>
                        <div className="sku-text">{good.skuText}</div>
                        <div className="sku">
                            <div className="price">￥{good.price}</div>
                            <div className="quantity">x{good.count}</div>
                        </div>
                    </div>
                </div>
            </div>
        </ShopDeleteItem>
    )
}

class ShopItem extends Component {
    static propTypes = {
        shop: PropTypes.object.isRequired
    };
    toggleShop(shopId) {
        this.props.onToggleShop(shopId);
    }
    toggleGoodsFn = good => {
        this.props.onToggleGood(good.skuId);
    };
    onChangeNum = (good, count) => {
        this.props.onChangeCount(good.skuId, count)
    }
    deleteGoodsFn = (skuId) => {
        alert('提示', '确定要删除这个商品吗', [
            {text: '取消', onPress: () => false},
            {text: '确定', onPress: () => this.props.onDeleteGood([skuId])},
        ])
    };

    render() {
        let {shop} = this.props;
        return (
            <section className="shop-item">
                <ShopName shop={shop}/>
                {shop.goods.map((good, index) => {
                    return shop.editing ? <ShopEditItem key={good.skuId} good={good}
                                                        toggleGoodsFn={this.toggleGoodsFn.bind(this, good)}
                                                        onChangeNum={this.onChangeNum.bind(this, good, ...arguments)}
                                                        deleteGoodsFn={this.deleteGoodsFn.bind(this, good.skuId)}/>
                        : <ShopGoodItem
                            key={good.skuId}
                            good={good}
                            toggleGoodsFn={this.toggleGoodsFn.bind(this, good)}
                            onSlideDeleteGood={this.deleteGoodsFn.bind(this, good.skuId)}
                            deleteGoodsFn={this.deleteGoodsFn.bind(this, good.skuId)}/>
                })}
            </section>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onToggleGood: skuId => dispatch(actions.toggleGood(skuId)),
        onToggleShop: shopId => dispatch(actions.toggleShop(shopId)),
        onDeleteGood: skuIdArr => dispatch(actions.deleteGood(skuIdArr)),
        onChangeCount: (skuId, count) => dispatch(actions.changeBuyCount(skuId, count))
    };
};
export default connect(null, mapDispatchToProps)(ShopItem);
