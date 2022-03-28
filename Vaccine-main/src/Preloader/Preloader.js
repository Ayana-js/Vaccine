import React from "react";
import minzdrav from '../img/minzdrav.png'
import logo from '../img/logo.png'
import './Preloader.css'

const Preloader = () => {
    return (
        <div className="preload ">
            <div className="loader-block">
                <div className="main-loader"></div>
            </div>
            <div className="preload__content">
                <div className="logo">
                    <img src={minzdrav} alt=""/>
                    <div className="plus">+</div>
                    <img src={logo} alt=""/>
                </div>
                <div>
                    <p className="int_text"> Разработано совместно <br/> <strong> с Министерством здравоохранения Кыргызской
                        Республики</strong></p>
                </div>
            </div>
        </div>
    )
}

export default Preloader