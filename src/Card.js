import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import QRCode from "qrcode.react";
import {Button} from '@mui/material';
import './App.css';
import Modal from './Modal';
import {createTheme} from '@mui/material/styles';
import {ThemeProvider} from '@emotion/react';
import {useSearchParams} from 'react-router-dom';
import Preloader from './Preloader';

const theme = createTheme({
    palette: {
        neutral: {
            main: '#fecc00',
            contrastText: '#fff',
        },
    },
});


const PersonCard = () => {
    const [inn, setInn] = useState('')
    const [qrLink, setQrLink] = useState('')
    const [fio, setFio] = useState('')
    const [vaccines, setVaccines] = useState([])
    const [active, setActive] = useState(false)
    const [photo, setPhoto] = useState([])
    const [numberId, setNumberId] = useState('')
    const [serialId, setSerialId] = useState('')
    const [searchParams] = useSearchParams();
    const [isFetching, setIsFetching] = useState(false)
    const [propusk, setPropusk] = useState()

    useEffect(() => {
        setIsFetching(true)
        axios.get(`https://ibank2.cbk.kg/minzdrav/covid-pass?phone=` + searchParams.get('phone'),
            {
                mode: 'no-cors',
                'Access-Control-Allow-Origin': '*'
            }).catch(err => console.log(err))
            .then(res => {
                setIsFetching(false)
                const propusk = res.data.propusk
                const inn = res.data.passport.inn
                const numberId = res.data.passport.numberId
                const serialId = res.data.passport.serialId
                const qrLink = res.data.propusk.qrLink
                const fio = res.data.propusk.fio
                const vaccines = res.data.propusk.vaccines
                const photo = res.data.propusk.photo
                setPropusk(propusk)
                setQrLink(qrLink)
                setFio(fio)
                setVaccines(vaccines)
                setPhoto(photo)
                setInn(inn)
                setNumberId(numberId)
                setSerialId(serialId)
            })
    }, [])

    return <div>
      {propusk === null ? 
     <div> <p> Запись отсутствует. Рекомендуем получить вакцину прививочном пункте. 
         Адреса ближайших прививочных пунктов и виды доступных вакцин можно просмотреть 
         здесь https://vc.emed.gov.kg (https://vc.emed.gov.kg/) </p> </div>: null
         }
      {isFetching? <Preloader />: 
        <Card sx={{maxWidth: 345}}>
            <CardContent>
                <Typography variant="h5" component="div">
                    <span> {fio} </span>
                </Typography>
                <img src={`data:image/jpeg;base64,${photo}`} style={{width: 110, height: 150}}/>
                <Typography variant="body2" color="text.secondary">
                    {vaccines.map(v => <span key={v.doza}>
                            <span> {v.vaccine_title}: {v.vaccine_name}, {v.vaccination_date}</span>
                        </span>
                    )}
                </Typography>
                <div>
                    <QRCode
                        value={qrLink} style={{marginRight: 10, marginBottom: 20, width: 200, height: 200}}
                        bgColor={"#ffffff"}
                        fgColor={"#007d82"}
                    />
                </div>
                <ThemeProvider theme={theme}>
                    <Button onClick={() => setActive(true)}
                            className='button'
                            variant="contained"
                            color="neutral"
                    >
                        Получить сертификат
                    </Button>
                </ThemeProvider>
                <Modal active={active} setActive={setActive} numberId={numberId} inn={inn} serialId={serialId}/>
            </CardContent>
        </Card>
}
    </div>
}


export default PersonCard