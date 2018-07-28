import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import * as actions from '@/redux/actions/'

import {Toast, Carousel} from "antd-mobile";
import ScrollBox from 'components/scrollBox/'
import StickyFooter from 'components/stickyFooter/'
import Title from 'components/title/'
import './index.scss'

const GoodItem = ({good}) => {
    return (
        <div className="goods-item">
            <div className="left"><img src={good.imgUrl} alt=""/></div>
            <div className="right">
                <div className="desc">{good.title}</div>
                <div className="sale">{good.saleText}<br/>
                    <button className="price">{good.price}元</button>
                </div>
                <div className="tip">{good.tip}</div>
            </div>
        </div>
    )
}
const GoodList = ({data}) => {
    return (
        <div className="good-list">
            {data.map(item => <GoodItem good={item} key={item.id}/>)}
        </div>
    )
}
const TITLE = [
    {title: '官方好物上新', class: 'new'},
    {title: '官方零食上架', class: 'hot'},
    {title: '饿就来一口', class: 'recommend'}
]
const ModuleItem = ({children, index}) => {
    let item = TITLE[index]
    var name = `${item.class}-goods`
    return (
        <div className={name} key={index}>
            <Title text={item.title}/>
            {children}
        </div>
    )
}
const Slides = ({slides, imgHeight, onSetHeight}) => {
    return (
        <Carousel autoplay={false} infinite>
            {slides.map(img => (
                <a key={img.text} href={img.href}
                   style={{display: 'inline-block', width: '100%', height: imgHeight}}>
                    <img src={img.imgUrl} alt={img.text}
                         style={{width: '100%', height: '100%', verticalAlign: 'middle'}}/>
                </a>
            ))}
        </Carousel>
    )
}

class Home extends Component {
    static propTypes = {
        homeInfo: PropTypes.object.isRequired,
        onGetHomeInfo: PropTypes.func.isRequired
    }
    state = {
        imgHeight: '3.6rem',
    }
    componentDidMount(){
        this.props.onGetHomeInfo()
    }
    handleHeight = () => {
        this.setState({imgHeight: 'auto'})
    }
    handlePullup = () => {
        Toast.loading("正在加载", 0);
        this.props.onGetHomeInfo()
    }

    render() {
        let {homeInfo} = this.props
        let {imgHeight} = this.state
        return (
            <ScrollBox onPullUp={this.handlePullup}>
                <StickyFooter>
                    <div className="home-container">
                        <div className="swiper-wrapper">
                            {
                                homeInfo.slides &&
                                <Slides slides={homeInfo.slides} onSetHeight={this.handleHeight} imgHeight={imgHeight}/>
                            }
                        </div>
                        <div className="search padding-s_2">
                            <i className="icon-search"></i>
                            <input type="text" placeholder="搜索商品"/>
                        </div>
                        <ModuleItem index="0" key="hotGoods">
                            <GoodList data={homeInfo.hotGoods}/>
                        </ModuleItem>
                        <ModuleItem index="1" key="classGoods">
                            <GoodList data={homeInfo.classGoods}/>
                        </ModuleItem>
                        <ModuleItem index="2" key="recommendGoods">
                            <GoodList data={homeInfo.recommendGoods}/>
                        </ModuleItem>
                    </div>
                </StickyFooter>
            </ScrollBox>
        )
    }
}

const mapStateToProps = (state) => {
    let {homeInfo} = state
    return {homeInfo}
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onGetHomeInfo: () => dispatch(actions.getHomeInfo())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)