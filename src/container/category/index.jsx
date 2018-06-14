import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {connect} from 'react-redux'
import * as actions from '@/redux/actions/'

import {Toast} from "antd-mobile";
import CategoryMenu from 'components/category/'
import SkuToast from 'components/productDetail/'
import './index.scss'

class Category extends Component {

    // xx = ()=>{
    //     this.props.onGetGoodDetail(123)
    // }
    render() {
        return (
            <CategoryMenu />
        )

    }
}

export default Category