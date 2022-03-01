import React, {useEffect, useState} from 'react'
import axios from 'axios'
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import QRCode from "qrcode.react";
import '../App.css';
import Modal from '../Modal/Modal'
import {NavLink, useSearchParams} from 'react-router-dom';
import Preloader from '../Preloader/Preloader';
import logo from '../img/logo.jpg'
import './Card.css'

const PersonCard = () => {
    const [result, setResult] = useState([])
    const [passport, setPassport] = useState()
    const [active, setActive] = useState(false)
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
            }).catch(err => setErr(err))
            .then(res => {
                setIsFetching(false)
                const result = res.data.propusk.result
                const propusk = res.data.propusk
                const passport = res.data.passport

                setPropusk(propusk)
                setResult(result)
                setPassport(passport)
            })
    }, [])
    localStorage.setItem('phone', search)

    useEffect(() => {
        if (show) {
            setTimeout(() => {
                setIsFetching(false)
                setShow(false)
            }, 1000)
        }
    }, [show])

    if (propusk === undefined) {
        return <div className='main-block'>
            <div style={{marginTop: 250, marginBottom: 400}}><p className="text"> Запись отсутствует.
                Рекомендуем получить вакцину в прививочном пункте.
                Адреса ближайших прививочных пунктов и виды доступных вакцин можно просмотреть здесь </p>
                <span> <a href="https://vc.emed.gov.kg" target="_blank"> https://vc.emed.gov.kg </a> </span> </div>
        </div>
    }

    if (err) {
        return <div>
            <p style={{marginTop: 250, marginBottom: 400}}> Данные отсутствуют </p>
        </div>
    }

    return <div>
        {isFetching || show? <Preloader/> :
            <div className='main-block'>
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    <span> {propusk.fio} </span>
                                </Typography>
                                <a href={`data:image/jpeg;base64,${propusk.photo}`} download>
                                    <img src={`data:image/jpeg;base64,${propusk.photo}`} style={{width: 110, height: 150}}
                                         onClick={() => setActive(false)}/>
                                </a>
                                <div className="text-dec">
                                <Typography onClick={() => setActive(false)} variant="body2" color="text.secondary">
                                    {propusk.vaccines.map(v => <div key={v.doza} className="text">
                             <strong    > {v.vaccine_title}: </strong>  {v.vaccine_name}, {v.vaccination_date}
                        </div>
                                    )}
                                </Typography>
                                </div>
                                <div>
                                    <QRCode
                                        id="qr-gen"
                                        value={propusk.qrLink}
                                        style={{width: 200, height: 200}}
                                        bgColor={"#ffffff"}
                                        fgColor={"#007d82"}
                                        imageSettings={{
                                            src: logo,
                                            x: null,
                                            y: null,
                                            height: 30,
                                            width: 30,
                                            padding: 10
                                        }}
                                    />
                                </div>
                                <a className="ant-btn btn-primary" onClick={() => !active? setActive(true): setActive(false)} >
                                  Получить сертификат
                                </a>
                                <Modal active={active} setActive={passport.setActive} numberId={passport.numberId} inn={passport.inn}
                                       serialId={password.serialId}/>
                                    <div onClick={() => setActive(false)} className={active? "button notActive" : "button"}>
                                        <NavLink to="/result" style={{textDecoration: 'none'}}>
                                        <a className="ant-btn btn-primary">
                                            Получить результаты ПЦР
                                        </a>
                                        </NavLink>
                                </div>
                                <div className='link'>
                                <a style={{color: '#007d82', textDecoration: 'none'}} href='https://vc.emed.gov.kg' target="_blank" > <span > Подробнее о вакцинации </span> </a>
                                </div>
                            </CardContent></div>}
    </div>
}

export default PersonCard