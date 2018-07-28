import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import * as actions from '@/redux/actions/'

import {Toast} from "antd-mobile";
import Nav from './components/nav'
import CategoryGoodItem from './components/categoryGoodItem'
import SkuToast from 'components/productDetail/'
import './index.scss'

class CategoryMenu extends Component {
    static propTypes = {
        categoryInfo: PropTypes.object.isRequired
    }
    state = {
        menuIndex: 0,
        showSkuToast: false,
        currentGoods: {}
    }
    goodsHeightList = [0]
    
    componentDidMount() {
        this.props.onGetCategory()
    }
    componentWillReceiveProps(nextProps) {
        this.initScroll()
        setTimeout(() => {
            this.calculateHeight()
        }, 0)
    }

    initScroll = () => {
        this.refs.goodsWrapper.addEventListener('scroll', pos => {
            if (!pos.target.scrollTop) {
                return
            }
            let top = pos.target.scrollTop
            this.scrollY = Math.abs(Math.round(top))
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
            this.refs.goodsWrapper.scrollTop = this.goodsHeightList[index]
            this.setState({
                menuIndex: index
            })
        }
    }
    selectGoodsFn = (good) => {
        this.setState(prevState => ({
            currentGoods: good
        }));
        this.toggleSkuFn()
    }
    toggleSkuFn = () => {
        this.setState(prevState => ({showSkuToast: !prevState.showSkuToast}));
    }
    addShopcartFn = (id, count) => {
        this.props.onAdd(id, count)
        this.toggleSkuFn();
    }

    render() {
        let {menuIndex, currentGoods, showSkuToast} = this.state
        let {categoryInfo} = this.props
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
                    <div className="goodlist">
                        {
                            category && category.map((typeItem, index) => {
                                return <div className="category-goods-item" key={typeItem.type}>
                                    <div className="category-title"
                                        onClick={this.addShopcartFn.bind(this, 1, 2)}>{typeItem.name}</div>
                                    <ul>
                                        {
                                            typeItem.goodList.map((good, goodIndex) => {
                                                return (
                                                    <CategoryGoodItem key={good.info} good={good}
                                                                      onClick={this.addShopcartFn.bind(1, 2)}
                                                                      onChangeToast={this.selectGoodsFn}></CategoryGoodItem>
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
                    showSkuToast && <SkuToast goodDetail={currentGoods}
                                              onAddShopcart={this.addShopcartFn}
                                              onCloseToast={this.toggleSkuFn}/>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    let {categoryInfo} = state
    return {categoryInfo}
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onGetCategory: () => dispatch(actions.getCategory()),
        onAdd: (id, count) => dispatch(actions.addShopcart(id, count)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CategoryMenu)