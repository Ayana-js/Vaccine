import {Button, Link} from "@mui/material";
<<<<<<< HEAD
import React from "react";
=======
import React, {useEffect, useState} from "react";
>>>>>>> 0b676e169fbbfe2928a69655419e07cc9a8294fd
import "./Modal.css"

const Modal = ({active, setActive, inn, numberId, serialId}) => {

    return <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
        <div className="modalContent" onClick={e => e.stopPropagation()}>
            <p>На каком языке вы бы хотели получить сертификат?</p>
            <div>
                <a href={`https://ibank2.cbk.kg/minzdrav/get-pdf-file?pin=${inn}&seriaId=${serialId}&nomerId=${numberId}`}
                   download>
                    <Button size="small" style={{marginBottom: '10px'}}> Русский / Кыргызский
                    </Button>
                </a>
            </div>
            <div>
                <a href={`https://ibank2.cbk.kg/minzdrav/get-pdf-file?pin=${inn}&seriaId=${serialId}&nomerId=${numberId}`}
                   download>
<<<<<<< HEAD
                    <Button size="small" style={{marginBottom: '10px'}}> Английский / English
=======
                    <Button size="small" style={{marginBottom: '10px'}}> Английский/English
>>>>>>> 0b676e169fbbfe2928a69655419e07cc9a8294fd
                    </Button>
                </a>
            </div>
            <div>
                <Button size="small" onClick={() => setActive(false)}> Отмена
                </Button></div>
        </div>
    </div>
}

export default Modal