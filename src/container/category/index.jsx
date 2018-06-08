import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {connect} from 'react-redux'
import * as actions from '@/actions/'

import {Toast} from "antd-mobile";
import BScroll from 'better-scroll'
import SkuToast from 'components/productDetail/'
import CategoryGoodItem from 'components/categoryGoodItem'
import './index.scss'

const GoodList = ({goodList}) => {
    return (
        <ul>
            {
                goodList.map((good, goodIndex) => {
                    return (
                        <CategoryGoodItem key={goodIndex} good={good}></CategoryGoodItem>
                    )
                })
            }
        </ul>
    )
}

class CategoryList extends Component {
    state = {
        menuIndex: 0,
    }
    goodsHeightList = [0]

    componentWillMount() {
        Toast.loading("正在加载", 0);
        this.props.onGetCategory()
    }

    componentWillReceiveProps(nextProps) {
        this.initScroll()
        setTimeout(() => {
            this.calculateHeight()
        }, 0)
    }

    initScroll = () => {
        this.menuScroll = new BScroll(this.refs.menuWrapper, {click: true})
        this.goodsScroll = new BScroll(this.refs.goodsWrapper, {
            click: true,
            probeType: 3,
            stopPropagation: true
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

    render() {
        let {menuIndex} = this.state
        let {categoryInfo, goodDetail} = this.props
        console.log('goodDetail.showToast')
        console.log(goodDetail.showToast)
        let menuItem = categoryInfo.goods.map((item, index) => {
            return <li className={classnames('category-menu-item', {'active': menuIndex === index})}
                       onClick={this.selectMenu.bind(this, index)}
                       key={index}>{item.name}</li>
        })
        let goodsItem = categoryInfo.goods.map((item, index) => {
            return (
                <li className="category-goods-item" key={item.type}>
                    <h1 className="category-title">{item.name}</h1>
                    <GoodList goodList={item.goodList}></GoodList>
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
                    goodDetail.showToast && <SkuToast
                        goodDetail={goodDetail.goodDetails}/>
                }
            </div>

        )

    }
}

const mapStateToProps = (state) => {
    console.log(state)
    let {categoryInfo, goodDetail} = state
    console.log('goodDetail')
    console.log(goodDetail)
    return {categoryInfo, goodDetail}
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onGetCategory: () => dispatch(actions.getCategory()),
        onGetGoodDetail: (id) => dispatch(actions.getGoodDetail(id)),
        onChangeBuyCount: (id, count) => dispatch(actions.changeBuyCount(id, count)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)