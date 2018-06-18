import React, {Component} from "react";
import PropTypes from "prop-types";

class CategoryGoodItem extends Component {
    static propTypes = {
        good: PropTypes.object.isRequired,
        onChangeToast: PropTypes.func.isRequired
    }
    getDetailFn = (good) => {
        this.props.onChangeToast(good)
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
                    <div className="price">￥{good.price.toFixed(2)}</div>
                    <div className="control" onClick={e => this.getDetailFn(good)}><i className="icon-add"></i></div>
                </div>
            </li>
        );
    }
}
export default CategoryGoodItem
