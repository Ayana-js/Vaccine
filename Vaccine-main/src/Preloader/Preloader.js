import React from "react";
import minzdrav from '../img/minzdrav.jpg'
import logo from '../img/logo-mbank.png'
import './Preloader.css'
import {Card} from "@mui/material";

const Preloader = () => {
    return (
        <div className="preload">
            <div className="loader"></div>
            <div className="preload__content">
                <div className="logo">
                    <img src={minzdrav} alt=""/>
                    <div className="plus">+</div>
                    <img src={logo} alt=""/>
                </div>
                <div className="text">
                    <p className="loader-text">Разработано совместно <br/> <strong>с Министерством здравоохранения Кыргызской
                        Республики</strong></p>
                </div>
            </div>
        </div>
    )
}

export default Preloader