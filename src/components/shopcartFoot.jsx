import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {connect} from 'react-redux';
import * as actions from '@/actions/';

class ShopcartFoot extends Component {
    static propTypes = {
        edit: PropTypes.bool.isRequired,
        shopcartList: PropTypes.array.isRequired,
    }
    state = {
        editing: false,
        allChecked: false,
        checkedList: [],
        total: 0.00
    }

    componentWillReceiveProps(nextProps) {
        console.log('nextProps foot')
        let {shopcart} = nextProps
        console.log(shopcart)
        let {shopcartList,edit} = shopcart
        let checkedList = []
        shopcartList.forEach(shop=>{
            shop.goods.forEach(good=>{
                if(good.checked){
                    checkedList.push(good)
                }
            })
        })
        let total = checkedList.reduce((prevTotal,currentGood)=>{
            return prevTotal + currentGood.price*currentGood.count
        },0)
        let allChecked = shopcartList.every(shop => shop.checked)
        this.setState({checkedList})
        this.setState({total:total.toFixed(2)})
        this.setState({allChecked})
    }

    toggleAllFn = (e) => {
        let allChecked = e.target.checked
        this.props.onCheckedAll()
        this.setState({allChecked})
    }

    render() {
        console.log(this.props.shopcart)
        let {allChecked, editing,total,checkedList} = this.state
        let editText = editing ? '完成' : '编辑'
        let delText = editing ? '删除' : '结算'
        return (
            <div className="shopcart-ft page-ft clearfix">
                <div className="left">
                    <div className="checkbox">
                        <label
                            className={classnames({'active': allChecked})}>
                            <input type="checkbox" checked={allChecked}
                                   onChange={this.toggleAllFn}/>
                        </label>
                    </div>
                    <label>全选</label>
                </div>
                {
                    !editing &&
                    <div className="right">
                        <div className="sum-price">合计：￥{total}<p>不含运费</p></div>
                    </div>
                }
                <button
                    className={classnames('pay-btn', {
                        'active': checkedList.length !== 0
                    })} onClick={this.goPayOrDeleteFn}>{delText}</button>
            </div>
        );

    }
}


const mapStateToProps = (state) => {
    console.log(state)
    let {shopcart} = state
    return {shopcart}
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onCheckedAll: () => dispatch(actions.checkedAllShop())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ShopcartFoot)