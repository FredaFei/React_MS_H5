import React, {Component} from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import {connect} from "react-redux";
import * as actions from '@/redux/actions/'
import {Modal} from "antd-mobile";

const alert = Modal.alert;

class ShopcartFoot extends Component {
    static propTypes = {
        shopcartList: PropTypes.array.isRequired
    }
    state = {
        editing: false,
        allChecked: false,
        checkedList: [],
        total: 0.0
    };

    componentWillReceiveProps(nextProps) {
        let {shopcartList, editing} = nextProps;
        let checkedList = [];
        shopcartList.forEach(shop => {
            shop.goods.forEach(good => {
                if (good.checked) {
                    checkedList.push(good);
                }
            });
        });
        let total = checkedList.reduce((prevTotal, currentGood) => {
            return prevTotal + currentGood.price * currentGood.count;
        }, 0);
        let allChecked = shopcartList.length !== 0 && shopcartList.every(shop => shop.checked);
        this.setState({checkedList});
        this.setState({total: total.toFixed(2)});
        this.setState({allChecked});
        this.setState({editing});
    }

    toggleAllFn = e => {
        let allChecked = e.target.checked;
        this.props.onCheckedAll();
        this.setState({allChecked});
    };

    goPayOrDeleteFn = () => {
        let {checkedList, editing} = this.state;
        let skuId = [];
        checkedList.forEach(good => {
            skuId.push(good.skuId);
        });
        if (editing) {
            alert("提示", `确定要删除这${skuId.length}个商品吗`, [
                {text: "取消", onPress: () => false},
                {text: "确定", onPress: () => this.props.onDeleteGood(skuId)}
            ]);
        }
    };

    render() {
        let {allChecked, total, checkedList, editing} = this.state;
        let delText = editing ? "删除" : "结算";
        return (
            <div className="shopcart-ft page-ft clearfix">
                <div className="left">
                    <div className="checkbox">
                        <label className={classnames({active: allChecked})}>
                            <input
                                type="checkbox"
                                checked={allChecked}
                                onChange={this.toggleAllFn}
                            />
                        </label>
                    </div>
                    <label>全选</label>
                </div>
                <div className="right">
                    {!editing && <div className="sum-price">合计：￥{total}<p>不含运费</p></div>}
                    <button
                        className={classnames("pay-btn", {active: checkedList.length !== 0})} onClick={this.goPayOrDeleteFn}>{delText}</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    let {shopcart} = state;
    let {shopcartList, editing} = shopcart;
    return {shopcartList, editing};
};
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onCheckedAll: () => dispatch(actions.checkedAllShop()),
        onDeleteGood: skuIdArr => dispatch(actions.deleteGood(skuIdArr))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ShopcartFoot);
