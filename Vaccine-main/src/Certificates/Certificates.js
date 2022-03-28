import React, {useEffect, useState} from 'react';
import './Certificates.css'
import {NavLink} from "react-router-dom";
import Preloader from "../Preloader/Preloader";

const Certificates = ({active, serialId, numberId, inn}) => {
    const [isFetching, setIsFetching] = useState(false)

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
            <div className="loader">  </div>
            :
        <div className='activeBlock'>
                <div className='blocks'>
                    <p className='certText'> Русский </p>
                    <form>
                        <a onClick={() => setIsFetching(true)}
                           href={`https://ibank2.cbk.kg/minzdrav/get-pdf-file?pin=${inn}&seriaId=${serialId}&nomerId=${numberId}`} className="btn-download-cer" download>
                            <span></span>
                            Скачать
                        </a>
                    </form>
                </div>
                <div className='blocks'>
                    <p className='certText'> Кыргызский </p>
                    <form>
                        <a onClick={() => setIsFetching(true)}
                           href={`https://ibank2.cbk.kg/minzdrav/get-pdf-file?pin=${inn}&seriaId=${serialId}&nomerId=${numberId}`} className="btn-download-cer" download>
                            <span></span>
                            Скачать
                        </a>
                    </form>
                </div>
                <div className='blocks'>
                    <p className='certText'> Английский </p>
                    <form>
                        <NavLink to='/cerEng' className='btn-download-cer'>
                            <span></span>
                            Скачать
                        </NavLink>
                    </form>
                </div>
            </div>} </>
    );
};

export default Certificates;