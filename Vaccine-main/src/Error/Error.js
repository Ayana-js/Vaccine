import React from 'react';
import error from '../img/error.png'
import './Error.css'

const Error = () => {
    return (
        <div>
           <img src={error} />
           <p className='textError'>Запись отсутствует.</p>
            <p className='descriptionError'>Обратитесь в прививочный пункт
                для внесения данных в реестр вакцинированных.</p>
        </div>
    );
};

export default Error;