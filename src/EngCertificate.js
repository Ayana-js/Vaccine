import {Button} from "@mui/material";
import React, {useEffect, useState} from "react";
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
})

const EngCertificate = () => {
    const [passNumber, setPassNumber] = useState('')
    const [numberId, setNumberId] = useState('')
    const [serialId, setSerialId] = useState('')
    const [inn, setInn] = useState('')
    const [num, setNum] = useState('')
    const [str, setStr] = useState('')
    const [email, setEmail] = useState('')
    const [isFetching, setIsFetching] = useState(false)
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
    useEffect(() => {
        if (isFetching) {
            setTimeout(() => {
                setIsFetching(false)
            }, 5000)
        }
    }, [isFetching]);
    const onClickSend = () => {
        let newString = passNumber.toString().replace(/[0-9]/g, '')
        let newNumber = passNumber.toString().replace(/\D/g, '')
        setStr(newString)
        setNum(newNumber)
    }
    return <div style={{marginTop: '30%', maxWidth: 450}}>
        {isFetching ? <p> Загрузка ... </p> :
            <div>
                <p> Укажите паспортные данные </p>
                <p style={{fontSize: 13, marginTop: 50}}> Для получения сертификата на английском языке введите данные с
                    загранпаспорта</p>
                <input placeholder="Номер загранпаспорта" onChange={(e) => setPassNumber(e.target.value)}/>
                <p style={{fontSize: 11, color: '#cccccc', marginBottom: 100}}> Введите заглавные буквы и номер без
                    пробелов</p>
                <input placeholder="Введите свой e-mail" onChange={(e) => setEmail(e.target.value)}/>

                <ThemeProvider theme={theme}>
                    <div>

                        <a onClick={() => setIsFetching(true)}
                           href={`https://ibank2.cbk.kg/minzdrav/get-pdf-file?pin=${inn}&seriaId=${serialId}&nomerId=${numberId}&passId=${str}&passNomer=${num}`}
                           target="_blank"
                           download>
                            <Button onClick={onClickSend} style={{textDecoration: 'underline #fecc00'}} size="small"
                                    variant="contained"
                                    color="neutral"> Получить сертификат </Button>
                        </a>
                    </div>
                </ThemeProvider></div>}
    </div>
}
export default EngCertificate