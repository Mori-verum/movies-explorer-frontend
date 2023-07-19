import React from 'react'
import './Preloader.css'

const Preloader = (props) => {
    return (
        <section className={props.hidden ? "preloader_hidden" : "preloader"}>
            <div className="preloader__container container">
                <span className="preloader__round"></span>
            </div>
        </section>
    )
};

export default Preloader
