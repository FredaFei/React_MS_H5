import React, {Component} from 'react'
import './index.scss'

class HelpCenter extends Component {
    state = {
        startX: 0,
        endX: 0,
        difX: 0,
        minX: 7,
        maxX: 0
    }
    slide = {
        transform: `translateX(0px)`
    }
    touchStart = (e) => {
        if (e.touches.length === 1) {
            let touches = e.touches[0]
            this.setState(prevState => ({startX: touches.clientX}))
            this.setState(prevState => ({maxX: this.remove.clientWidth}))
        }
    }
    touchMove = (e) => {
        if (e.touches.length === 1) {
            let touches = e.touches[0]
            let {startX, minX, maxX, difX} = this.state
            difX = startX - touches.clientX
            if (difX > minX) {
                document.addEventListener("touchmove", this.handler, {passive: false})
            }
            if (difX <= 0) {
                difX = 0
            } else if (difX > maxX) {
                difX = maxX
            }
            this.setState(prevState => ({difX}))
            this.slide = {
                transform: `translateX(-${difX}px)`
            }
        }
    }
    touchEnd = (e) => {
        if (e.touches.length === 1) {
            let {startX, endX, maxX, difX} = this.state
            endX = e.changedTouches[0].clientX
            difX = startX - endX
            if (difX < maxX / 2) {
                difX = 0
            } else {
                difX = maxX
            }
            this.setState(prevState => ({endX}))
            this.setState(prevState => ({difX}))
            this.slide = {
                transform: `translateX(-${difX}px)`
            }
            document.removeEventListener("touchmove", this.handler, {passive: false})
            document.addEventListener("touchmove", function (e) {
                e.returnValue = true
            }, {passive: false});

        }
    }

    handler(e) {
        e.preventDefault()
    }

    removeHandler = () => {
        this.props.onSlideDeleteGood()
    }

    render() {
        let {slide} = this
        let {children} = this.props
        return (
            <div className="delete-item">
                <div className="content" onTouchStart={this.touchStart}
                     onTouchMove={this.touchMove}
                     onTouchEnd={this.touchEnd} style={slide}>
                    {children}
                </div>
                <div className="delete slide" ref={el => this.remove = el} onClick={this.removeHandler}>删除
                </div>
            </div>
        )

    }
}

export default HelpCenter