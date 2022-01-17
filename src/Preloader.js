import React from "react";
import img from './img/img.jpg'
import './Preloader.css'

const Preloader = () => {
    return <div> <img src={img} style={{width: 200, height: 200, paddingTop: 50 }} /> 
                  <div class="loader">Загружается ...</div>
                 <p className="text"> Реализовано совместно с Министерством здравоохранения Кыргызской Республики </p>
                 </div>
}

export default Preloader