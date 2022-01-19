import {Button} from "@mui/material";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import EngCertificate from "./EngCertificate";
import "./Modal.css"

const Modal = ({ setActive, active, inn, numberId, serialId}) => {
   const [isActive, setIsActive] = useState(false)
   
    return  <div className={active ? "modal active" : "modal"}>
        <div className="modalContent" onClick={e => e.stopPropagation()}>
            <p>На каком языке вы бы хотели получить сертификат?</p>
            <div>
                <a href={`https://ibank2.cbk.kg/minzdrav/get-pdf-file?pin=${inn}&seriaId=${serialId}&nomerId=${numberId}`}
                   download>
                    <Button size="small" style={{marginBottom: '10px', textDecoration: 'none'}}> Русский / Кыргызский </Button>
                </a>
            </div>
            <div> 
                <NavLink to="/cerEng">
                    <Button onClick={() => setIsActive(true)} size="small" style={{marginBottom: '10px', textDecoration: 'none'}} > Английский/English </Button>
                </NavLink>   
            </div>
        </div>
    </div>
}

export default Modal
