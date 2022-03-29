import React, {useState, useRef, useEffect} from 'react';
import vector from '../img/Vector.png'
import vectorRed from '../img/Vector_red.png'
import './Pcr.css'
import arrow_down from '../img/arrow-down.png'

const Pcr = ({result, positiveResult, inn}) => {
    const [isFetching, setIsFetching] = useState(false)
    const [show, setShow] = useState(false)

    useEffect(() => {
        if (isFetching) {
            setTimeout(() => {
                setIsFetching(false)
            }, 5000)
        }
    }, [isFetching]);

    return (
        <>
            {isFetching ?
                <div className="loader"></div>
                :
                <div className="main-half">
                    <div className="half">
                        {result.map(result =>
                            <>
                                <div className="tab"  >
                                    <input id={result.dateResult} type="checkbox" name="tabs"/>
                                    <label htmlFor={result.dateResult} onClick={() => setShow(prev => !prev)}>
                                        <img className="icon-left" src={result.positive? vectorRed: vector} alt=""/>
                                        <div className="data">
                                            {result ? result.dateResult.slice(0, -9) :  null}
                                            {/*{show && <p className="data-text">Тест активен: до 14 марта 13:00</p>}*/}
                                        </div>
                                        <div className="icon-right">
                                            <img className="arrow" src={arrow_down}/>
                                        </div>
                                    </label>
                                    <div className="tab-content">
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
                                            <a href={`https://ibank2.cbk.kg/minzdrav/pcrcert-pdf-file-by-date?pin=${inn}&date=${result.dateResult.slice(6,10)}-${result.dateResult.slice(3,5)}-${result.dateResult.slice(0,2)}`}
                                               className="btn__download" onClick={() => setIsFetching(true)} download>
                                                <span className="donwload__icon"></span>
                                                Скачать
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>}
        </>
    );
};

export default Pcr;