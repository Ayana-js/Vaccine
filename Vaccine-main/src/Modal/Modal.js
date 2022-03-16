import React, {useEffect, useState} from "react";
import { NavLink } from "react-router-dom";
import "./Modal.css"

const Modal = ({ active, inn, numberId, serialId}) => {
    console.log(active)
    const [isActive, setIsActive] = useState(false)
    const [isFetching, setIsFetching] = useState(false)

    useEffect(() => {
        if (isFetching) {
            setTimeout(() => {
                setIsFetching(false)
            } , 5000)}
    }, [isFetching])

    if (isFetching) {
        return <p> Загрузка ... </p>
    }

    return  <div className={active ? "modal active" : "modal"}>
                <p className="text">На каком языке вы бы хотели получить сертификат?</p>
                <div className="linkTop">
                        <a href={`https://ibank2.cbk.kg/minzdrav/get-pdf-file?pin=${inn}&seriaId=${serialId}&nomerId=${numberId}`}
                       className="links"  onClick={() =>  {setIsFetching(true)} } download > Русский / Кыргызский </a>
                    <NavLink to="/cerEng" style={{textDecoration: "white"}}>
                        <p  className="links" onClick={() => setIsActive(true)}> Английский / English </p>
                    </NavLink>   
                </div>
    </div>
}

export default Modal
