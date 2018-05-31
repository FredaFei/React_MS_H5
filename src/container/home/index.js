import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import * as actions from '@/actions/'

import { Toast } from "antd-mobile";
import ScrollBox from 'components/scrollBox/'
import CopyRight from 'components/copyRight/'
import Title from 'components/title/'
import './index.scss'

const GoodItem = ({good})=>{
    return (
        <div className="goods-item">
            <div className="left"><img src={good.imgUrl} alt=""/></div>
            <div className="right">
                <div className="desc">{good.title}</div>
                <div className="sale">{good.saleText}<br/><button className="price">{good.price}元</button></div>
                <div className="tip">{good.tip}</div>
            </div>
        </div>
    )
}
const GoodList = ({data})=>{
    return(
        <div className="good-list">
            {data.map(item=><GoodItem good={item} key={item.id}/>)}
        </div>
    )
}
const TITLE = [
    {title: '官方好物上新', class:'new'},
    {title: '官方零食上架', class: 'hot'},
    {title: '饿就来一口', class: 'recommend'}
]
const ModuleItem = ({children,index})=>{
    let item = TITLE[index]
    var name = `${item.class}-goods`
    return(
        <div className={name} key={index}>
            <Title text={item.title} />
            {children}
        </div>
    )
}
class Home extends Component{
    static propTypes = {
        homeInfo: PropTypes.object.isRequired,
        onGetHomeInfo: PropTypes.func.isRequired
    }
    componentWillMount(){
        Toast.loading("正在加载", 0);
        this.props.onGetHomeInfo()
    }
    handlePullup = ()=>{
        Toast.loading("正在加载", 0);
        this.props.onGetHomeInfo()
    }
    render(){
        let {homeInfo} = this.props
        return (
            <ScrollBox onPullUp={this.handlePullup}>
                <div className="home-container" ref="homeContainer">
                    <div className="swiper-wrapper"><img src="" alt=""/></div>
                    <div className="search padding-s_2"><i className="icon-usercenter"></i><input type="text" placeholder="搜索商品"/></div>
                    <div className="discount-list padding-m_2">
                        <div className="discount-item"></div>
                    </div>
                    <ModuleItem index="0" key="hotGoods">
                        <GoodList data={homeInfo.hotGoods} />
                    </ModuleItem>
                    <ModuleItem index="1" key="classGoods">
                        <GoodList data={homeInfo.classGoods} />
                    </ModuleItem>
                    <ModuleItem index="2" key="recommendGoods">
                        <GoodList data={homeInfo.recommendGoods} />
                    </ModuleItem>
                    <CopyRight />
                </div>    
            </ScrollBox>
        )
    }
}

const mapStateToProps = (state)=>{
    let {homeInfo} = state
    return {homeInfo}
}
const mapDispatchToProps = (dispatch,ownProps)=>{
    return {
        onGetHomeInfo: ()=>dispatch(actions.getHomeInfo())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)