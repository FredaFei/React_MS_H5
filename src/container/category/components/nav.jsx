import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

class Nav extends Component {
    static propTypes = {
        navs: PropTypes.array.isRequired,
        menuIndex: PropTypes.number.isRequired
    }
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