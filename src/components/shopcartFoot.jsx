import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import * as actions from "@/actions/";
import { Modal } from "antd-mobile";
const alert = Modal.alert;

class ShopcartFoot extends Component {
  state = {
    editing: false,
    allChecked: false,
    checkedList: [],
    total: 0.0
  };

  componentWillReceiveProps(nextProps) {
    console.log("nextProps foot");
    console.log(nextProps);
    let { shopcartList,edit } = nextProps;
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
    let allChecked = shopcartList.every(shop => shop.checked);
    this.setState({ checkedList });
    this.setState({ total: total.toFixed(2) });
    this.setState({ allChecked });
  }

  toggleAllFn = e => {
    let allChecked = e.target.checked;
    this.props.onCheckedAll();
    this.setState({ allChecked });
  };
  goPayOrDeleteFn() {
    let { edit } = this.props;
    let {checkedList} = this.state
    let skuId = []
    checkedList.forEach(good=>{
        skuId.push(good.skuId)
    })
    if (edit) {
      alert("提示", "确定要删除这个商品吗", [
        { text: "取消", onPress: () => false },
        { text: "确定", onPress: () => this.props.onDeleteGood([skuId]) }
      ]);
    }
  }

  render() {
    let { allChecked, total, checkedList } = this.state;
    let { edit } = this.props;
    let delText = edit ? "删除" : "结算";
    return (
      <div className="shopcart-ft page-ft clearfix">
        <div className="left">
          <div className="checkbox">
            <label className={classnames({ active: allChecked })}>
              <input
                type="checkbox"
                checked={allChecked}
                onChange={this.toggleAllFn}
              />
            </label>
          </div>
          <label>全选</label>
        </div>
        {!edit && (
          <div className="right">
            <div className="sum-price">
              合计：￥{total}
              <p>不含运费</p>
            </div>
          </div>
        )}
        <button
          className={classnames("pay-btn", {
            active: checkedList.length !== 0
          })}
          onClick={this.goPayOrDeleteFn}
        >
          {delText}
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
    console.log(state)
    let {shopcart} = state
    let {shopcartList, edit} = shopcart
    return {shopcartList, edit}
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onCheckedAll: () => dispatch(actions.checkedAllShop()),
    onDeleteGood: skuIdArr => dispatch(actions.deleteGood(skuIdArr))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ShopcartFoot);
