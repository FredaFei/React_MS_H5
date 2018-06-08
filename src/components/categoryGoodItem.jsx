import React, {Component} from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import {connect} from "react-redux";
import * as actions from "@/actions/";

class CategoryGoodItem extends Component {
    getDetailFn = (e, goodId) => {
        // e.stopPropagation()
        this.props.onGetGoodDetail(goodId)
        console.log(goodId)
    }

    render() {
        let {good} = this.props;
        return (
            <li className="goods-cell">
                <div className="img">
                    <img src={good.image} alt=""/>
                </div>
                <div className="desc">
                    <div className="info">{good.name}</div>
                    <div className="price">￥{good.price}</div>
                    <div className="control" onClick={e => this.getDetailFn(e, good.goodId)}>+</div>
                </div>
            </li>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    // let { goodId } = ownProps;
    return {
        onGetGoodDetail: (goodId) => dispatch(actions.getGoodDetail(goodId))
    };
};
export default connect(null, mapDispatchToProps)(CategoryGoodItem);
