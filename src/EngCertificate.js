import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import {ThemeProvider} from '@emotion/react';
import {createTheme} from '@mui/material/styles';
import './EngCertificate.css'
import axios from "axios";

const theme = createTheme({
    palette: {
        neutral: {
            main: '#fecc00',
            contrastText: '#fff',
        },
    },
});

const EngCertificate = () => {
       const [passNumber, setPassNumber] = useState()  
       const [numberId, setNumberId] = useState('')
       const [serialId, setSerialId] = useState('')
       const [inn, setInn] = useState('')
       const search = localStorage.getItem('phone')

       useEffect(() => {
        axios.get(`https://ibank2.cbk.kg/minzdrav/covid-pass?phone=` + search,
            {
                mode: 'no-cors',
                'Access-Control-Allow-Origin': '*'
            }).catch(err => console.log(err))
            .then(res => {
                const inn = res.data.passport.inn
                const numberId = res.data.passport.numberId
                const serialId = res.data.passport.serialId

                setInn(inn)
                setNumberId(numberId)
                setSerialId(serialId)
            })
    }, [])

       
    return <div style={{marginTop: 200, width: 300}} >
    <p> Укажите паспортные данные </p>  
    <p style={{fontSize: 13, marginTop: 50}} > Для получения сертификата на английском языке введите данные с загранпаспорта</p>
    <input placeholder="Номер загранпаспорта" value={passNumber} onChange={() => setPassNumber(passNumber)} /> 
    <p  style={{fontSize: 11, color: '#cccccc', marginBottom: 100}}> Введите  заглавные буквы и номер без пробелов</p>
    
           <ThemeProvider theme={theme}> 
           <div>
           <a href={`https://ibank2.cbk.kg/minzdrav/get-pdf-file?pin=${inn}&seriaId=${serialId}&nomerId=${numberId}`}
            download>
            <Button style={{textDecoration: 'underline #fecc00'}} size="small"  variant="contained"
               color="neutral"> Отправить </Button>
            </a>
            </div>
           </ThemeProvider>
</div>}
export default EngCertificate