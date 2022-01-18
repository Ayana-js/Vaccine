import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {useSearchParams} from 'react-router-dom';
import {ThemeProvider} from '@emotion/react';
import {createTheme} from '@mui/material/styles';
import "./EngCertificate.css"

const theme = createTheme({
    palette: {
        neutral: {
            main: '#fecc00',
            contrastText: '#fff',
        },
    },
});

const EngCertificate = (inn, serialId, numberId, isActive) => {
       const [passNumber, setPassNumber] = useState()    

    return <div  className={isActive ? "modal active" : "modal"} style={{width: 300, marginTop: 200, }}> <p> Укажите паспортные данные </p>  
                 <p style={{fontSize: 13, marginTop: 50}} > Для получения сертификата на английском языке введите данные с загранпаспорта</p>
                 <input placeholder="Номер загранпаспорта" value={passNumber} onChange={() => setPassNumber(passNumber)} /> 
                 <p  style={{fontSize: 11, color: '#cccccc', marginBottom: 100}}> Введите  заглавные буквы и номер без пробелов</p>
                 <a href={`https://ibank2.cbk.kg/minzdrav/get-pdf-file?pin=${inn}&seriaId=${serialId}&nomerId=${numberId}`}
                   download>
                        <ThemeProvider theme={theme}> 
                         <Button style={{textDecoration: 'underline #fecc00'}} size="small"  variant="contained"
                            color="neutral"> Отправить </Button>
                        </ThemeProvider>
                 </a>
    </div>
}

export default EngCertificate