import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import * as actions from "@/actions/";

import Cell from "components/cell/";
import Controller from "components/controller/";
import ShopName from "components/shopName";
import { Modal } from "antd-mobile";
const alert = Modal.alert;

class ShopItem extends Component {
  static propTypes = {
    shop: PropTypes.object.isRequired
  };
  state = {
    editText: "编辑"
  };
  componentWillReceiveProps(nextProps) {
    console.log("nextProps item");
    console.log(nextProps);
  }

  toggleShop(shopId) {
    this.props.onToggleShop(shopId);
  }

  toggleGoodsFn = good => {
    this.props.onToggleGood(good.skuId);
  };
  deleteGoodsFn = (event, skuId) => {
      event.persist()
    this.props.onDeleteGood([skuId]);
    // alert('提示', '确定要删除这个商品吗', [
    //   { text: '取消', onPress: () => console.log('cancel') },
    //   { text: '确定', onPress: () => this.props.onDeleteGood([skuId]) },
    // ])
  };

  render() {
    let { editText } = this.state;
    let { shop } = this.props;
    console.log('shop item')
    console.log(this.props);
    return (
      <section className="shop-item">
        <ShopName shop={shop} />
        {shop.goods.map((good, index) => {
          console.log(good);
          return (
            <div className="shopcart-list" key={index}>
              <div className="checkbox">
                <label className={classnames({ active: good.checked })}>
                  <input
                    type="checkbox"
                    onChange={this.toggleGoodsFn.bind(this, good)}
                  />
                </label>
              </div>
              <img src={good.imgUrl} alt="" />
              {/*正常状态*/}
              <div className="info">
                <div className="name">{good.skuDesc}</div>
                <div className="sku-text">{good.skuText}</div>
                <div className="sku">
                  <div className="price">￥{good.price}</div>
                  <div className="quantity">x{good.count}</div>
                </div>
              </div>
              {/*编辑状态*/}
              {good.editing && (
                <div
                  className="del-btn"
                  onClick={e => {
                    e.persist = () => {};
                    this.deleteGoodsFn(e, good.skuId);
                  }}
                >
                  删除
                </div>
              )}
            </div>
          );
        })}
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onToggleGood: skuId => dispatch(actions.toggleGood(skuId)),
    onToggleShop: shopId => dispatch(actions.toggleShop(shopId)),
    onDeleteGood: skuIdArr => dispatch(actions.deleteGood(skuIdArr))
  };
};
export default connect(null, mapDispatchToProps)(ShopItem);
