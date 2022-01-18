import {Button} from "@mui/material";
import React from "react";
import "./Modal.css"

const Modal = ({active, setActive, inn, numberId, serialId}) => {

    return <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
        <div className="modalContent" onClick={e => e.stopPropagation()}>
            <p>На каком языке вы бы хотели получить сертификат?</p>
            <div>
                <a href={`https://ibank2.cbk.kg/minzdrav/get-pdf-file?pin=${inn}&seriaId=${serialId}&nomerId=${numberId}`}
                   download>
                    <Button size="small" style={{marginBottom: '10px', textDecoration: 'none'}}> Русский / Кыргызский
                    </Button>
                </a>
            </div>
            <div>
                   download>
                    <Button size="small" style={{marginBottom: '10px', textDecoration: 'none'}}> Английский/English
                    </Button>
              
            </div>
        </div>
    </div>
}

export default Modal