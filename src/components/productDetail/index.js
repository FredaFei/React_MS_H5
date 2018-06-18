import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Controller from 'components/controller/'
import './index.scss';

class SkuToast extends Component {
    static propTypes = {
        goodDetail: PropTypes.object.isRequired
    }
    state = {
        buyCount: 1
    }
    addShopcartFn = () => {
        let {buyCount} = this.state
        let {goodDetail} = this.props
        this.props.onAddShopcart(goodDetail.goodId, buyCount)
    }
    immediatePurchaseFn = () => {
        this.addShopcartFn()
    }
    onChangeNum = (buyCount) => {
        this.setState({buyCount})
    }
    closeSkuFn = () => {
        this.props.onCloseToast()
    }

    render() {
        let {buyCount} = this.state
        let {goodDetail} = this.props
        return (
            <section className="sku-toast-wrapper" ref={el => this.showToast = el}>
                <div className="mask" onClick={this.closeSkuFn.bind(this, false)}></div>
                <div className="sku-content">
                    <div className="sku-head">
                        <div className="img"></div>
                        <div className="info">
                            <div className="name ellipsis">【明文脆皮】{goodDetail.name}</div>
                            <div className="price">￥ {goodDetail.price}</div>
                            <div className="icon-close close" onClick={this.closeSkuFn.bind(this, false)}></div>
                        </div>
                    </div>
                    <div className="sku-body">
                        <div className="cell-form">
                            <div className="cell-item">
                                <div className="left">
                                    <span>购买数量：</span>
                                    <span>剩余{goodDetail.stock}件</span>
                                </div>
                                {
                                    goodDetail.stock &&
                                    <Controller stock={goodDetail.stock}
                                                buyCount={buyCount}
                                                maxCount={goodDetail.maxCount}
                                                onChangeNum={this.onChangeNum}/>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="sku-foot">
                        <button className="btn" onClick={this.addShopcartFn.bind(this)}>加入购物车</button>
                        <button className="btn" onClick={this.immediatePurchaseFn.bind(this)}>立即购买</button>
                    </div>
                </div>

            </section>
        )
    }
}

export default SkuToast