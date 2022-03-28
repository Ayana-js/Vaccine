import React from 'react';
import error from '../img/error.png'
import './Error.css'
import minzdrav from "../img/minzdrav.png";
import logo from "../img/logo.png";

const Error = () => {
    return (
        <div className='wrapper__error'>
            <img src={error} />
            <p className='textError'>Запись отсутствует</p>
            <p className='descriptionError'>Обратитесь в прививочный пункт <br/>
                для внесения данных в реестр <br/> вакцинированных</p>
            <div className="preload__content_">
                <div className="logo">
                    <img src={minzdrav} alt=""/>
                    <span>+</span>
                    <img src={logo} alt=""/>
                </div>
                <div className="int_text">
                    <p>Разработано совместно <br/> <strong> с Министерством здравоохранения Кыргызской
                        Республики </strong> </p>
                </div>
            </div>
        </div>
    );
};

export default Error;