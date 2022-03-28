import React from 'react';
import './VaccineInfo.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Vector from '../img/Vector_1.png'
const VaccineInfo = ({propusk}) => {
    const settings = {
        dots: false,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        // centerMode: true,
        arrows: false,
        variableWidth: true,
    };
    return (
                <div className="main__slider">
                    <Slider {...settings} className="slider__content">
                        {propusk.vaccines.map(v =>
                        <div key={v.vaccination_date} className="slider__items">
                            <div className="carousel">
                                <div className="items__title">
                                    <h3 className="vaccine-name">{v.vaccine_name}</h3>
                                    <img src={Vector} className="vaccine-icon"/>
                                </div>
                                <div className="items__text">
                                    <span className="vaccine-title">{v.doza} вакцинация:</span>
                                    <p>{v.vaccination_date}</p>
                                </div>
                            </div>
                        </div>)}
                    </Slider>
                </div>
    );
};

export default VaccineInfo;