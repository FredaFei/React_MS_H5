import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {connect} from 'react-redux'
import * as actions from '@/redux/actions/'

import {Toast} from "antd-mobile";

class Nav extends Component {
    selectMenu = (index) => {
        this.props.selectMenu(index)
    }

    render() {
        let {navs, menuIndex} = this.props
        return (
            <ul className="menu-list">
                {
                    navs.map((item, index) => {
                        return <li className={classnames('category-menu-item', {'active': menuIndex === index})}
                                   onClick={this.selectMenu.bind(this, index)}
                                   key={index}>{item.name}</li>
                    })
                }
            </ul>
        )
    }
}

export default Nav