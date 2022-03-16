import React from 'react';
import './Certificates.css'

const Certificates = ({active}) => {
    console.log(active)
    return (
        // <div className={active ? "activeBlock" : "certBlock"}>
        <div className='activeBlock container'>
                <div className='blocks'>
                    <p className='certText'> Русский </p>
                    <form>
                        <a href="btn" className="btn-download">
                            <span></span>
                            Скачать
                        </a>
                    </form>
                </div>
                <div className='blocks'>
                    <p className='certText'> Кыргызский </p>
                    <form>
                        <a href="btn" className="btn-download">
                            <span></span>
                            Скачать
                        </a>
                    </form>
                </div>
                <div className='blocks'>
                    <p className='certText'> Английский </p>
                    <form>
                        <a href="btn" className="btn-download">
                            <span></span>
                            Скачать
                        </a>
                    </form>
                </div>
            </div>
    );
};

export default Certificates;