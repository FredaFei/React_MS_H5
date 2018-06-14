import React from 'react';
import CopyRight from 'components/copyRight/'
import './index.scss'

export default ({children,style})=>{
    return (
        <div className="sticky-footer-wrap" style={style}>
            <section className="main">{children}</section>
            <section className="site-footer">
                <CopyRight/>
            </section>
        </div>
    )
}