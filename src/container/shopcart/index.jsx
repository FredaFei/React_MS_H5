import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {connect} from 'react-redux';
import * as actions from '@/actions/';

import Cell from 'components/cell/'
import ScrollBox from 'components/scrollBox/'
import CopyRight from 'components/copyRight/'
import ShopItem from 'components/shopItem.jsx'
import ShopcartFoot from 'components/shopcartFoot.jsx'
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

class ShopList extends Component {
    componentWillReceiveProps(nextProps) {
        console.log('nextProps list')
        console.log(nextProps.shopcart)
    }

    render() {
        let {shopcart} = this.props
        return (
            <div className="shop-content">
                {
                    shopcart.map((shop, shopIndex) => <ShopItem shop={shop} shopIndex={shopIndex} key={shopIndex}></ShopItem>)
                }
            </div>
        )
    }
}

class Shopcart extends Component {
    static propTypes = {
        // shopcartList: PropTypes.array.isRequired,
        onGetShopcartList: PropTypes.func.isRequired
    }

    componentDidMount() {
        console.log(this.props)
        if (this.props.shopcartList.length === 0) {
            this.props.onGetShopcartList()
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log('nextProps index')
        // let {shopcart} = nextProps
        console.log(nextProps)
    }

    render() {
        let {shopcartList,edit} = this.props
        console.log(this.props)
        let content = null
        if (shopcartList.length === 0) {
            content = <EmptyCart/>
        } else {
            content = <ShopList shopcart={shopcartList} edit={edit} />
        }
        return (
            <div className="shopcart-wrap">
                <ScrollBox>
                    <div className="shopcart-hd">
                        <Cell/>
                    </div>
                    <div className="shopcart-bd">
                        {content}
                        <div className="copy">
                            <CopyRight/>
                        </div>
                    </div>
                </ScrollBox>
                <ShopcartFoot shopcartList={shopcartList} edit={edit}/>
            </div>
        );

    }
}


const mapStateToProps = (state) => {
    console.log(state)
    let {shopcart} = state
    let {shopcartList, edit} = shopcart
    return {shopcartList, edit}
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onGetShopcartList: () => dispatch(actions.getShopcartList()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Shopcart)