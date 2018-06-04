import React,{Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {connect} from 'react-redux';
import * as actions from '@/actions/';
import {http} from '@/common/http'
import url from '@/common/apiServer'

import Cell from 'components/cell/'
import Controller from 'components/controller/'
import ScrollBox from 'components/scrollBox/'
import CopyRight from 'components/copyRight/'
import ShopItem from 'components/shopItem.jsx'
import './index.scss'

const EmptyCart = () => {
    return (
        <div className="empty-shopcart">
            <p className="message">购物车快饿扁了T.T</p>
            <p className="wish">快给我挑点宝贝</p>
            <button className="go">去逛逛</button>
        </div>
    )
}

class ShopList extends Component{
    componentWillReceiveProps(nextProps){
        console.log('nextProps list')
        console.log(nextProps.shopcart)
    }
    render(){
        let {shopcart} = this.props
        return (
            <div className="shop-content">
                {
                    shopcart.map((shop, shopIndex) => <ShopItem shop={shop} key={shopIndex}></ShopItem>)
                }
            </div>
        )
    }
}
class Shopcart extends Component {
    state = {
        editing: false,
        shopList: [],
        showToast: false,
        text: '确定删除该商品吗？',
        removeData: null
    }
    allChecked = false
    allRemoveChecked = false
    checkedList = []
    removeCheckedList = []
    total = 0

    componentWillMount(){
        this.props.onGetShopcartList()
    }
    componentWillReceiveProps(nextProps){
        console.log('nextProps index')
        console.log(nextProps)
    }
    render() {
        let {editing, shopList, showToast, text} = this.state
        let editText = editing ? '完成' : '编辑'
        let delText = editing ? '删除' : '结算'
        let {shopcart} = this.props
        let content = null
        if (shopcart.length === 0) {
            content = <EmptyCart/>
        }else{
            content = <ShopList shopcart={shopcart}/>
        }
        return (
            <div className="shopcart-wrap">
                <ScrollBox>
                    <div className="shopcart-hd">
                        <Cell />
                    </div>
                    <div className="shopcart-bd">
                        {content}
                        <div className="copy">
                            <CopyRight/>
                        </div>
                    </div>
                </ScrollBox>
                <div className="shopcart-ft page-ft clearfix">
                    <div className="left">
                        <div className="checkbox">
                            <label
                                className={classnames({'active': editing ? this.allRemoveChecked : this.allChecked})}>
                                <input type="checkbox" checked={editing ? this.allRemoveChecked : this.allChecked}
                                       onChange={this.toggleAllFn}/>
                            </label>
                        </div>
                        <label>全选</label>
                    </div>
                    {
                        !editing &&
                        <div className="right">
                            <div className="sum-price">合计：￥{this.total.toFixed(2)}<p>不含运费</p></div>
                        </div>
                    }
                    <button
                        className={classnames('pay-btn', {
                            'active': editing ? this.removeCheckedList.length !== 0 : this.checkedList.length !== 0
                        })} onClick={this.goPayOrDeleteFn}>{delText}</button>
                </div>
            </div>
        );

    }
}


const mapStateToProps = (state)=>{
    console.log(state)
    let {shopcart} = state
    return {shopcart}
}
const mapDispatchToProps = (dispatch,ownProps)=>{
    let {shopId,goodId} = ownProps
    return {
        onGetShopcartList: ()=>dispatch(actions.getShopcartList())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Shopcart)