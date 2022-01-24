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
import logo from './img/logo.jpg'

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
    const [err, setErr] = useState()
    const [show, setShow] = useState(false)
    const search = searchParams.get('phone')
  
    useEffect(() => {
        setIsFetching(true)
        setShow(true)
    }, [])


    useEffect(() => {
        axios.get(`https://ibank2.cbk.kg/minzdrav/covid-pass?phone=` + search,
            {
                mode: 'no-cors',
                'Access-Control-Allow-Origin': '*'
            }).catch(err =>  setErr(err))
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
  localStorage.setItem('phone', search)

  useEffect(() => {
      if (show) {
      setTimeout(() => {
      setIsFetching(false)
      setShow(false)
    } , 3000)}
  }, [show]);

    return <div>   
      {isFetching || show ? <Preloader />: 
        <Card sx={{maxWidth: 345}}>
            {err? <p style={{marginTop: 250, marginBottom: 400}}> Данные отсутствуют
            </p>: <div>
            {propusk === undefined? 
        <div style={{marginTop: 250, marginBottom: 400}} > <p> Запись отсутствует. Рекомендуем получить вакцину в прививочном пункте. 
        Адреса ближайших прививочных пунктов и виды доступных вакцин можно просмотреть здесь </p>
        <a href="https://vc.emed.gov.kg"> https://vc.emed.gov.kg </a> </div> : <div> 
        <CardContent>
                <Typography variant="h5" component="div">
                    <span> {fio} </span>
                </Typography>
                <img src={`data:image/jpeg;base64,${photo}`} style={{width: 110, height: 150}} onClick={() => setActive(false)}/>
                <Typography  onClick={() => setActive(false)} variant="body2" color="text.secondary">
                    {vaccines.map(v => <span key={v.doza}>
                            <span> {v.vaccine_title}: {v.vaccine_name}, {v.vaccination_date}</span>
                        </span>
                    )}
                </Typography>
                <div>
                    <QRCode
                        onClick={() => setActive(false)}
                        value={qrLink} style={{marginRight: 10, marginBottom: 20, width: 200, height: 200}}
                        bgColor={"#ffffff"}
                        fgColor={"#007d82"}
                        imageSettings={{
                            src: logo,
                            x: null,
                            y: null,
                            height: 30,
                            width: 30,
                            excavate: true,
                          }}
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
                <Modal active={active} setActive={setActive} numberId={numberId} inn={inn} serialId={serialId} />
            </CardContent> </div> } </div> }
        </Card> } 
    </div> 
     }

export default PersonCard