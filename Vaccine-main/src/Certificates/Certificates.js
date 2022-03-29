import React, {useEffect, useState} from 'react';
import './Certificates.css'
import {NavLink} from "react-router-dom";
import Preloader from "../Preloader/Preloader";

const Certificates = ({active, serialId, numberId, inn}) => {
    const [isFetchingFirst, setIsFetchingFirst] = useState(false)
    const [isFetchingSecond, setIsFetchingSecond] = useState(false)


    useEffect(() => {
        if (isFetchingFirst) {
            setTimeout(() => {
                setIsFetchingFirst(false)
            }, 5000)
        }
    }, [isFetchingFirst]);

    useEffect(() => {
        if (isFetchingSecond) {
            setTimeout(() => {
                setIsFetchingSecond(false)
            }, 5000)
        }
    }, [isFetchingSecond]);
    let isFetching;
    return (
        <div className='activeBlock'>
                <div className='blocks'>
                    <p className='certText'> Русский </p>
                    <form>
                        {<a onClick={() => setIsFetchingFirst(true)}
                              href={`https://ibank2.cbk.kg/minzdrav/get-pdf-file?pin=${inn}&seriaId=${serialId}&nomerId=${numberId}`} className="btn-download-cer" download>
                            {isFetchingFirst? <div className="loader_mini"></div>: <> <span>  </span> Скачать </> }
                        </a>}
                    </form>
                </div>
                <div className='blocks'>
                    <p className='certText'> Кыргызский </p>
                    <form>
                        <a onClick={() => setIsFetchingSecond(true)}
                           href={`https://ibank2.cbk.kg/minzdrav/get-pdf-file?pin=${inn}&seriaId=${serialId}&nomerId=${numberId}`} className="btn-download-cer" download>
                            {isFetchingSecond? <div className="loader_mini"></div>: <> <span>  </span> Скачать </> }
                        </a>
                    </form>
                </div>
                <div className='blocks'>
                    <p className='certText'> Английский </p>
                    <form>
                        <NavLink to='/cerEng' className='btn-download-cer'>
                            <span> </span>
                            Скачать
                        </NavLink>
                    </form>
                </div>
            </div>
    );
};

export default Certificates;