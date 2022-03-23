import React, {useState, useRef} from 'react';
import vector from '../img/Vector.png'
import './Pcr.css'
import {useDetectOutsideClick} from "./UseDetectOutsideClick";
import {FaAngleUp} from 'react-icons/fa';

const Pcr = ({result, positiveResult}) => {
    const [isFetching, setIsFetching] = useState(false)
    const [inn, setInn] = useState()
    const [serialId, setSerialId] = useState()
    const [numberId, setNumberId] = useState()
    const dropdownRef = useRef(null);
    const [isSelect, setIsSelect] = useDetectOutsideClick(dropdownRef, false);
    const onClick = () => setIsSelect(!isSelect);
    const search = localStorage.getItem('phone')
    return (
        // <div className="menu-container">
        //     <div className="menu__content">
        //          <div>
        //             <div onClick={onClick} className="menu-trigger">
        //                 <span className="menu__left__icon"></span>
        //                 <p className="menu_trigger_data">{result ? result.dateResult.slice(0, -9) : null}</p>
        //                 <span className="menu__right__icon">
        //                     <FaChevronDown className="FaChevronDown"/>
        //                 </span>
        //             </div>
        //             <div
        //                 ref={dropdownRef}
        //                 className={ !isSelect? "menu" : "menu activemenu"}
        //             >
        //                 <div className="menu__items">
        //                     <span>Результат</span>
        //                     <p className="result">{result.positive ? 'Положительный' : 'Отрицательный'} </p>
        //                 </div>
        //                 <div className="menu__items">
        //                     <span>Анализ</span>
        //                     <p>{result && result.analizName.length > 20 ? result.analizName.slice(0, -138) : result.analizName}
        //                         {positiveResult && positiveResult.length > 20 ? positiveResult.analizName.slice(0, -138) : null}</p>
        //                 </div>
        //                 <div className="menu__items">
        //                     <a href="#" className="btn__download">
        //                         <span className="donwload__icon"></span>
        //                         Скачать
        //                     </a>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>

        <div className="main-half">
            <div className="half">
                {result.map(result =>
                    <>
                    <div className="tab">
                    <input id={result.dateResult} type="checkbox" name="tabs"/>
                    <label htmlFor={result.dateResult}>
                        <img className="icon-left" src={vector} alt=""/>
                        {result ? result.dateResult.slice(0, -9) : null}
                        <div className="icon-right">
                            <FaAngleUp className={"angel"}/>
                        </div>
                    </label>
                    <div className="tab-content" >
                    <div className="tab-content-items">
                    <span>Результат</span>
                    <p className="result">{result.positive ? 'Положительный' : 'Отрицательный'}</p>
                    </div>
                    <div className="tab-content-items">
                    <span>Анализ</span>
                    <p className="analise">{result && result.analizName.length > 20 ? result.analizName.slice(0, -138) : result.analizName}
                {positiveResult && positiveResult.length > 20 ? positiveResult.analizName.slice(0, -138) : null}</p>
                    </div>
                    <div className="tab-content-btn">
                    <a href="btn" className="btn__download">
                    <span className="donwload__icon"></span>
                    Скачать
                    </a>
                    </div>
                    </div>
                    </div>
                    </>
                    )}
            </div>
        </div>
    );
};

export default Pcr;