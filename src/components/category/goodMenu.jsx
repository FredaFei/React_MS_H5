import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {connect} from 'react-redux'
import * as actions from '@/redux/actions/'

import {Toast} from "antd-mobile";
import CategoryGoodItem from 'components/categoryGoodItem';

const GoodList = ({goodList}) => {
    return (
        <ul>
            {
                goodList.map((good, goodIndex) => {
                    return (
                        <CategoryGoodItem key={good.info} good={good}></CategoryGoodItem>
                    )
                })
            }
        </ul>
    )
}


class GoodMenu extends Component {
    render() {
        let {googs} = this.props
        return (
            <div className="goodmenu-content">
                {
                    googs.map((item, index) => {
                        return <li className="category-goods-item" key={item.type}>
                            <h1 className="category-title" onClick={this.xx}>{item.name}</h1>
                            {/*<GoodList goodList={item.goodList}></GoodList>*/}

                        </li>
                    })
                }
            </div>
        )
    }
}

export default GoodMenu