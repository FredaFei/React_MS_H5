import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {connect} from 'react-redux'
import * as actions from '@/redux/actions/'

import BScroll from 'better-scroll'
import {Toast} from "antd-mobile";
import Nav from './nav'
import GoodMenu from './goodMenu'
import CategoryGoodItem from 'components/categoryGoodItem'
import SkuToast from 'components/productDetail/'

class CategoryMenu extends Component {
    state = {
        menuIndex: 0,
        styleTop: {
            top: '0px'
        }
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
    componentDidMount(){
    }
    initScroll = () => {
        this.menuScroll = new BScroll(this.refs.menuWrapper, {click: true})
        this.goodsScroll = new BScroll(this.refs.goodsWrapper, {
            click: true,
            probeType: 3,
            // stopPropagation: true
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
        // this.refs.goodsWrapper.addEventListener('scroll', pos => {
        //     if (!pos.target.scrollTop) {
        //         return
        //     }
        //     let top = pos.target.scrollTop
        //     this.scrollY = Math.abs(Math.round(top))
        //     const index = this.calculateCurrentIndex()
        //     if (this.state.menuIndex !== index) {
        //         this.setState({
        //             menuIndex: index
        //         })
        //     }
        // })
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
            console.log(index)
            console.log(aGoodList[index].clientHeight)
            // this.setState({
            //     styleTop: {transform: `translate(0px,-${aGoodList[index].clientHeight*2}px) translateZ(0px)`}
            // })
            // this.refs.goodsWrapper.scrollTo({
            //     top: aGoodList[index],
            //     behavior: "smooth"
            // });
            // this.refs.goodsWrapper.scrollTop = aGoodList[index].clientHeight * 2
        }
    }
    closeToast = ()=>{
        console.log(90)
        this.props.onClose()
    }
    render() {
        let {menuIndex,styleTop} = this.state
        let {categoryInfo,goodDetail} = this.props
        let {category} = categoryInfo
        let navs = []
        if (category) {
            category.forEach(item => {
                navs.push({type: item.type, name: item.name})
            })
        }
        return (
            <div className="category-content">
                <div className="nav-content" ref="menuWrapper">
                    <Nav navs={navs} menuIndex={menuIndex} selectMenu={this.selectMenu}/>
                </div>
                <div className="goodmenu-content" ref="goodsWrapper">
                    <div className="goodlist" style={styleTop}>
                        {
                            category && category.map((typeItem, index) => {
                                return <div className="category-goods-item" key={typeItem.type}>
                                    <h1 className="category-title" onClick={this.xx}>{typeItem.name}</h1>
                                    <ul>
                                        {
                                            typeItem.goodList.map((good, goodIndex) => {
                                                return (
                                                    <CategoryGoodItem key={good.info} good={good}></CategoryGoodItem>
                                                )
                                            })
                                        }
                                    </ul>

                                </div>
                            })
                        }
                    </div>
                </div>
                {
                    goodDetail.showToast && <SkuToast
                      goodDetail={goodDetail.goodDetails} onCloseToast={this.closeToast}/>
               }
                {/*<GoodMenu googs={goodList}/>*/}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    let {categoryInfo, goodDetail} = state
    return {categoryInfo, goodDetail}
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onGetCategory: () => dispatch(actions.getCategory()),
        onGetGoodDetail: (id) => dispatch(actions.getGoodDetail(id)),
        onClose: () => dispatch(actions.closeToast()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CategoryMenu)