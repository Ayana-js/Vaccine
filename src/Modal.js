import { Button, Link} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Modal.css"

const Modal = ({active, setActive, inn, numberId}) => {
    const [cer, setCer] = useState('')
    // useEffect(()=> {
    //     axios.get(`https://ibank2.cbk.kg/minzdrav/get-pdf-file?pin=${inn}&seriaId=ID&nomerId=${numberId}`,
    //     {
    //         mode: 'no-cors',
    //         'Access-Control-Allow-Origin': '*'
    //     })
    //     .catch(err =>console.log(err))
    //     .then(res => { 
    //        const cer = res.data
    //        setCer(cer)})
    // })

    const url = "https://ibank2.cbk.kg/minzdrav/get-pdf-file?pin=&{inn}\\&seriaId=ID\\&nomerId=&{nomerId}"

    return <div className={active? "modal active": "modal"} onClick={()=> setActive(false)}>
                <div className="modalContent" onClick={e => e.stopPropagation()}> 
                <p>На каком языке вы бы хотели получить сертификат?</p>
               <div> 
                   <a href="https://ibank2.cbk.kg/minzdrav/get-pdf-file?pin=\\&{inn}&seriaId=ID&nomerId=\\&{nomerId}"  download>
                   <Button size="small" style={{marginBottom: '10px'}}> Русский / Кыргызский 
                   </Button> 
                   </a>                
               </div> 
                <div>
                   <a href="https://ibank2.cbk.kg/minzdrav/get-pdf-file?pin=21610199201196&seriaId=ID&nomerId=0304674"  download>
                    <Button  size="small" style={{marginBottom: '10px'}}>  Английский/English 
                    </Button>
                    </a>
                    </div> 
                <div> 
                    <Button  size="small"  onClick={()=> setActive(false)}> Отмена 
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