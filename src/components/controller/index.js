import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import './index.scss'

class Controller extends Component {
    static propTypes = {
        maxCount: PropTypes.number.isRequired,
        stock: PropTypes.number.isRequired,
        buyCount: PropTypes.number.isRequired
    }
    quantity = this.props.buyCount
    shouldComponentUpdate(nextProps){
        return this.quantity !== nextProps.buyCount
    }
    componentWillUpdate(nextProps){
        this.quantity = nextProps.buyCount
    }
    changeInputNum = (e)=>{
        let num = +(e.target.value)
        let count = this._checkCount(num)
        this.props.onChangeNum(count)
    }
    changeCountFn = (val)=>{
        let {quantity} = this
        quantity = quantity + val
        let count = this._checkCount(quantity)
        this.props.onChangeNum(count)
    }
    _checkCount(num){
        const {stock} = this.props
        num = num>=stock ? stock : num
        num = num<=1 ? 1 : num
        return num
    }
    render() {
        let {stock,buyCount,maxCount} = this.props
        let reduceUnactive = (buyCount<=1) ? true : false
        let addUnactive = (buyCount>=stock || buyCount>=maxCount) ? true : false
        return (
            <div className="controller">
                <button className={classnames('btn-oprator reduce',{'disabled':reduceUnactive})} disabled={reduceUnactive} onClick={this.changeCountFn.bind(this,-1)}>-</button>
                <input type="number" name="count" className="input-num" value={this.quantity} onChange={e=>this.changeInputNum.bind(this,e)}/>
                <button className={classnames('btn-oprator add',{'disabled':addUnactive})} disabled={addUnactive} onClick={this.changeCountFn.bind(this,1)}>+</button>
            </div>
        )
    }
}

export default Controller