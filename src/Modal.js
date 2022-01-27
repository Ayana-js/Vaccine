import {Button} from "@mui/material";
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

        <div className="modalContent" onClick={e => e.stopPropagation()}>
            <p>На каком языке вы бы хотели получить сертификат?</p>
            <div>
                {/*<a href={`https://ibank2.cbk.kg/minzdrav/get-pdf-file?pin=${inn}&seriaId=${serialId}&nomerId=${numberId}`} target="_blank"*/}
                {/*   download>*/}
                <NavLink to="/cerKgz">
                    <Button onClick={() =>  {setIsFetching(true)} } size="small" style={{marginBottom: '10px', textDecoration: 'none'}}> Русский / Кыргызский </Button>
                {/*</a>*/}
                </NavLink>

            </div>
            <div>
                <NavLink to="/cerEng">
                    <Button onClick={() => setIsActive(true)} size="small" style={{marginBottom: '10px', textDecoration: 'none'}} > Английский/English </Button>
                </NavLink>   
            </div>
        </div> }
    </div>
}

export default Modal
