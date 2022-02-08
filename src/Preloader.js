import React from "react";
import img from './img/img.jpg'
import './Preloader.css'

const Preloader = () => {
    return <div className='wrap'> <img src={img} style={{width: 200, height: 200, paddingTop: 50 }} />
                  <div className="loader">Загружается ...</div>
                 <p className="text"> Реализовано совместно с Министерством здравоохранения Кыргызской Республики </p>
                 </div>
}

export default Preloader