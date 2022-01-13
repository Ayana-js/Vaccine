import { Button, Link} from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import "./Modal.css"

const Modal = ({active, setActive, info}) => {
    return <div className={active? "modal active": "modal"} onClick={()=> setActive(false)}>
                <div className="modalContent" onClick={e => e.stopPropagation()}> 
                <p>На каком языке вы бы хотели получить сертификат?</p>
               <div> <Link href={info.certificate}  target='_blank' rel='noopener noreferrer'>>
                   <Button variant="contained" size="small" style={{marginBottom: '10px'}}> Русский / Кыргызский 
                   </Button> </Link>                
               </div> 
                <div> <Link href={info.certificate}  target='_blank' rel='noopener noreferrer'>
                    <Button variant="contained" size="small" style={{marginBottom: '10px'}}> English 
                    </Button> </Link>
                    </div> 
                <div> 
                    <Button variant="contained" size="small"  onClick={()=> setActive(false)}> Отмена 
                    </Button> </div>
                 </div>
                {/* <div> <NavLink to="cerEng">
                    <Button variant="contained" size="small" style={{marginBottom: '10px'}}> English 
                    </Button> </NavLink>
                    </div> 
                <div> 
                    <Button variant="contained" size="small"  onClick={()=> setActive(false)}> Отмена 
                    </Button> </div>
                 </div> */}
                 

    </div>
}

export default Modal