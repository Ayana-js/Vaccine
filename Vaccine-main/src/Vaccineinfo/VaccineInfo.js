import React from 'react';
import './VaccineInfo.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { RiSyringeLine } from 'react-icons/ri';

const VaccineInfo = ({propusk}) => {
    const settings = {
        dots: false,
        infinite: false,
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: false,
        variableWidth: true,
    };
    return (
                <div className="main__slider container">
                    <Slider {...settings} className="slider__content">
                        {propusk.vaccines.map(v =>
                        <div className="slider__items">
                            <div className="carousel">
                                <div className="items__title">
                                    <h3>{v.vaccine_name}</h3>
                                    <span><RiSyringeLine/></span>
                                </div>
                                <div className="items__text">
                                    <span>{v.vaccine_title}:</span>
                                    <p>{v.vaccination_date}</p>
                                </div>
                            </div>
                        </div> )}
                    </Slider>
                </div>
    );
};

export default VaccineInfo;