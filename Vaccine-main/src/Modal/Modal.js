import React, {useEffect, useState} from "react";
import { NavLink } from "react-router-dom";
import "./Modal.css"

const Modal = ({ active, inn, numberId, serialId}) => {
    const [isActive, setIsActive] = useState(false)
    const [isFetching, setIsFetching] = useState(false)

    useEffect(() => {
        if (isFetching) {
            setTimeout(() => {
                setIsFetching(false)
            } , 5000)}
    }, [isFetching])

    return  <div className={active ? "modal active" : "modal"}>
        {isFetching? <p> Загрузка ... </p>:
            <div>
                <p className="text">На каком языке вы бы хотели получить сертификат?</p>
                <div className="linkTop">
                        <a href={`https://ibank2.cbk.kg/minzdrav/get-pdf-file?pin=${inn}&seriaId=${serialId}&nomerId=${numberId}`} target="_blank"
                        download className="links"  onClick={() =>  {setIsFetching(true)} } > Русский / Кыргызский </a>
                </div>
                <div>
                    <NavLink to="/cerEng" style={{textDecoration: "transparent"}}>
                        <a  className="links" onClick={() => setIsActive(true)}> Английский / English </a>
                    </NavLink>   
                </div>
            </div> 
        }
    </div>
}

export default Modal
