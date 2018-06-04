import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {connect} from 'react-redux';
import * as actions from '@/actions/';

import Cell from 'components/cell/'
import Controller from 'components/controller/'

class ShopName extends Component {
    state = {
        editText: '编辑',
        shopChecked: false
    }
    componentWillReceiveProps(nextProps){
        console.log('nextProps item')
        console.log(nextProps)
        let {shop} = nextProps
        var shopChecked = shop.goods.every(good=>good.checked)
        this.setState(prevState=>({shopChecked}))
    }
    toggleAllFn = (e) => {
        console.log(e.target.checked)
        let shopChecked = e.target.checked
        let {shop} = this.props
        this.props.onShopToggle(shop.shopId)
        this.setState({shopChecked})
    }
    changeEditStatusFn = () => {
    }
    render() {
        let {editText,shopChecked} = this.state
        let {shop} = this.props
        return (
            <div className="shop-name">
                <div className="left">
                    <div className="checkbox">
                        <label
                            className={classnames({'active': shopChecked})}>
                            <input type="checkbox"
                                   checked={shopChecked}
                                   onChange={this.toggleAllFn}/>
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

// class ShopCell extends Component{
//     toggleGoodsFn = (good)=>{
//         console.log(this.props)
//         this.props.onToggleGood(good.goodId)
//     }
//     render(){
//         let {good} = this.props
//         console.log(this.props)
//         return(
//             <div className="shopcart-list">
//                 <div className="checkbox">
//                     <label className={classnames({'active': good.checked})}>
//                         <input type="checkbox"
//                                onChange={this.toggleGoodsFn.bind(this, good)}/>
//                     </label>
//                 </div>
//                 <img src={good.imgUrl} alt=""/>
//                 {/*正常状态*/}
//                 <div className="info">
//                     <div className="name">{good.skuDesc}</div>
//                     <div className="sku-text">{good.skuText}</div>
//                     <div className="sku">
//                         <div className="price">￥{good.price}</div>
//                         <div className="quantity">x{good.count}</div>
//                     </div>
//                 </div>
//                 {/*编辑状态*/}
//                 {/*{editing && <div className="del-btn"*/}
//                 {/*onClick={this.deleteGoodsFn.bind(this, goods, index)}>删除</div>}*/}
//             </div>
//         )
//     }
// }
class ShopItem extends Component {
    state = {
        editText: '编辑'
    }
    toggleAllFn = () => {
    }
    changeEditStatusFn = () => {
    }

    toggleShop(shopId) {
        this.props.onToggleShop(shopId)
    }

    toggleGoodsFn = (good) => {
        this.props.onToggleGood(good.skuId)
    }

    render() {
        let {editText} = this.state
        let {shop,onShopToggle} = this.props
        console.log(this.props)
        return (
            <section className="shop-item">
                <ShopName shop={shop} onShopToggle={onShopToggle}/>
                {
                    shop.goods.map((good,index)=>{
                        console.log(good)
                        return (
                            <div className="shopcart-list" key={index}>
                                <div className="checkbox">
                                    <label className={classnames({'active': good.checked})}>
                                        <input type="checkbox"
                                               onChange={this.toggleGoodsFn.bind(this, good)}/>
                                    </label>
                                </div>
                                <img src={good.imgUrl} alt=""/>
                                {/*正常状态*/}
                                <div className="info">
                                    <div className="name">{good.skuDesc}</div>
                                    <div className="sku-text">{good.skuText}</div>
                                    <div className="sku">
                                        <div className="price">￥{good.price}</div>
                                        <div className="quantity">x{good.count}</div>
                                    </div>
                                </div>
                                {/*编辑状态*/}
                                {/*{editing && <div className="del-btn"*/}
                                {/*onClick={this.deleteGoodsFn.bind(this, goods, index)}>删除</div>}*/}
                            </div>
                        )
                    })

                }
            </section>
        )

    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onToggleGood: (skuId) => dispatch(actions.toggleGood(skuId)),
        onToggleShop: (shopId) => dispatch(actions.toggleShop(shopId)),
        onShopToggle: (shopId) => dispatch(actions.shopToggle(shopId)),
        onShopChecked: (shopId) => dispatch(actions.shopChecked(shopId)),
    }
}
export default connect(null, mapDispatchToProps)(ShopItem)