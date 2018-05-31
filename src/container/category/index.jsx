import React,{Component} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {connect} from 'react-redux'
import * as actions from '@/actions/'

import { Toast } from "antd-mobile";
import BScroll from 'better-scroll'
import SkuToast from 'components/productDetail/'
import './index.scss'

class GoodItem extends Component{
    detailToastFn = (goodId)=>{
        this.props.onOpenGoodDetail(goodId)
    }
    render(){
        let {good} = this.props
        return (
            <li className="goods-cell" >
                <div className="img"><img src={good.image} alt=""/></div>
                <div className="desc">
                    <div className="info">{good.name}</div>
                    <div className="price">￥{good.price}</div>
                    <div className="control" onClick={this.detailToastFn.bind(this,good.goodId)}>+</div>
                </div>
            </li>
        )
    }
}
const GoodList = ({goodList,openGoodDetailFn})=>{
    return (
            <ul >
                {
                    goodList.map((good, goodIndex) => {
                        return (
                            <GoodItem key={goodIndex} good={good} onOpenGoodDetail={openGoodDetailFn}></GoodItem>
                        )
                    })
                }
            </ul>
        )
}
class CategoryList extends Component{
    state = {
        menuIndex: 0,
        showSkuToast: false,
    }
    goodsHeightList = [0]
    componentWillMount(){
        Toast.loading("正在加载", 0);
        this.props.onGetCategory()
    }
    componentWillReceiveProps(nextProps){
        this.initScroll()
        setTimeout(() => {
            this.calculateHeight()
        }, 0)
    }

    initScroll = () => {
        this.menuScroll = new BScroll(this.refs.menuWrapper, {click: true})
        this.goodsScroll = new BScroll(this.refs.goodsWrapper, {
            click: true,
            probeType: 3
        })
        this.goodsScroll.on('scroll', pos => {
            if (!pos.y) {
                return
            }
            this.scrollY = Math.abs(Math.round(pos.y))
            const index = this.calculateCurrentIndex()
            if (this.state.menuIndex !== index) {
                this.setState({
                    menuIndex: index
                })
            }
        })
    }
    calculateHeight = () => {
        let aGoodList = [...this.refs.goodsWrapper.querySelectorAll('.category-goods-item')]
        let tempHeight = 0
        aGoodList.forEach(item => {
            tempHeight += item.clientHeight
            this.goodsHeightList.push(tempHeight)
        });
    }
    calculateCurrentIndex = () => {
        for (let i = 0; i < this.goodsHeightList.length; i++) {
            let height1 = this.goodsHeightList[i]
            let height2 = this.goodsHeightList[i + 1]
            if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                return i
            }
        }
        return 0
    }
    selectMenu = (index) => {
        if (this.state.menuIndex !== index) {
            let aGoodList = this.refs.goodsWrapper.querySelectorAll('.category-goods-item')
            this.goodsScroll.scrollToElement(aGoodList[index], 100)
        }
    }
    openGoodDetailFn = (id) => {
        console.log(id)
        this.props.onGetGoodDetail(id)
        this.setState({showSkuToast: true})
    }
    closeSkuFn = (bool)=>{
        this.setState({
            showSkuToast: bool
        })
    }
    setCount = (id,count)=>{
        // this.props.onChangeBuyCount(id,count)
    }
    render() {
        let {menuIndex, showSkuToast} = this.state
        let {categoryInfo,goodDetail} = this.props
        let menuItem = categoryInfo.goods.map((item, index) => {
            return <li className={classnames('category-menu-item', {'active': menuIndex === index})}
                       onClick={this.selectMenu.bind(this, index)}
                       key={index}>{item.name}</li>
        })
        let goodsItem = categoryInfo.goods.map((item, index) => {
            return (
                <li className="category-goods-item" key={item.type}>
                    <h1 className="category-title">{item.name}</h1>
                    <GoodList goodList={item.goodList} openGoodDetailFn={this.openGoodDetailFn}></GoodList>
                </li>
            );
        })
        return (
            <div className="page-wrapper">
                <div className="category-container page-bd">
                    <div className="menu-wrapper" ref="menuWrapper">
                        <ul className="menu-list">{menuItem}</ul>
                    </div>
                    <div className="goods-wrapper" ref="goodsWrapper">
                        <ul className="goods-list">{goodsItem}</ul>
                    </div>
                </div>
                {
                    showSkuToast &&<SkuToast 
                        goodDetail={goodDetail} 
                        closeSkuFn={this.closeSkuFn}
                        onShopcart={this.addShopcart} />
                }
            </div>

        )

    }
}
const mapStateToProps = (state)=>{
    console.log(state)
    let {categoryInfo,goodDetail} = state
    return {categoryInfo,goodDetail}
}
const mapDispatchToProps = (dispatch,ownProps)=>{
    return {
        onGetCategory: ()=>dispatch(actions.getCategory()),
        onGetGoodDetail: (id)=>dispatch(actions.getGoodDetail(id)),
        onChangeBuyCount: (id,count)=>dispatch(actions.changeBuyCount(id,count)),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(CategoryList)