import React, { useState, useRef } from 'react';
import vector from '../img/Vector.png'
import PcrDetails from "../PcrDetails/PcrDetails";
import './Pcr.css'
import { useDetectOutsideClick } from "./UseDetectOutsideClick";
import { FaChevronDown } from 'react-icons/fa';

const Pcr = ({result, positiveResult}) => {
    const [isFetching, setIsFetching] = useState(false)
    const [inn, setInn] = useState()
    const [serialId, setSerialId] = useState()
    const [numberId, setNumberId] = useState()
    const dropdownRef = useRef(null);
    const [isSelect, setIsSelect] = useDetectOutsideClick(dropdownRef, false);;
    const onClick = () => setIsSelect(!isSelect);
    const search = localStorage.getItem('phone')
    return (
        <div className="menu-container container">
            {/*{ result.map((res) => <div> <img src={vector}/>*/}
            {/*    {res ? res.dateResult.slice(0, -9) : null}*/}
            {/*    <PcrDetails result={result} positiveResult={positiveResult}/></div>)}*/}
            <div className="menu__content container">
                {result.map(res => <>
                    <div onClick={onClick} className="menu-trigger">
                    <span className="menu__left__icon"></span>
                    <p className="menu_trigger_data"> {res ? res.dateResult.slice(0, -9) : null} </p>
                    <span className="menu__right__icon">
                        <FaChevronDown className="FaChevronDown"/>
                    </span>
                </div>
                    <div
                    ref={dropdownRef}
                    className={`menu ${isSelect ? "active" : "inactive"}`}
                    >
                    <div className="menu__items">
                    <span>Результат</span>
                    <p className="result">{res.labResult? 'Отрицательный': null} {positiveResult? 'Положитьельный': null}</p>
                    </div>
                    <div className="menu__items">
                    <span>Анализ</span>
                    <p>{res? res.dateResult.slice(0, -9): null}</p>
                    </div>
                    <div className="menu__items">
                    <a href="btn" className="btn__download">
                    <span className="donwload__icon"></span>
                    Скачать
                    </a>
                    </div> </div> </>)}

            </div>
        </div>
    );
};

export default Pcr;