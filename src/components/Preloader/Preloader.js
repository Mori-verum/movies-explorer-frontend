import React from 'react'
import './Preloader.css'

const Preloader = (props) => {
    return (
        <div className={ props.hidden ? "preloader_hidden" : "preloader"}>
            <div className="preloader__container container">
                <span className="preloader__round"></span>
            </div>
        </div>
    )
};

export default Preloader
