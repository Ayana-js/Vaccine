import React, {useEffect, useState} from 'react'
import axios from 'axios'
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import QRCode from "qrcode.react";
import './App.css';
import Modal from './Modal';
import {NavLink, useSearchParams} from 'react-router-dom';
import Preloader from './Preloader';
import logo from './img/logo.jpg'
import './Card.css'

const PersonCard = () => {
    const [result, setResult] = useState([])
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
    const [analisis, setAnalisis] = useState([])

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
                const inn = res.data.passport.inn
                const numberId = res.data.passport.numberId
                const serialId = res.data.passport.serialId
                const qrLink = res.data.propusk.qrLink
                const fio = res.data.propusk.fio
                const vaccines = res.data.propusk.vaccines
                const photo = res.data.propusk.photo
                const analisis = res.data.propusk.positiveanalyzis

                setPropusk(propusk)
                setResult(result)
                setQrLink(qrLink)
                setFio(fio)
                setVaccines(vaccines)
                setPhoto(photo)
                setInn(inn)
                setNumberId(numberId)
                setSerialId(serialId)
                setAnalisis(analisis)
            })
    }, [])
    localStorage.setItem('phone', search)

    useEffect(() => {
        if (show) {
            setTimeout(() => {
                setIsFetching(false)
                setShow(false)
            }, 1500)
        }
    }, [show]);

    return <div>
        {isFetching || show ? <Preloader/> :
            <div className='main-block'>
                {err ? <p style={{marginTop: 250, marginBottom: 400}}> Данные отсутствуют
                </p> : <div>
                    {propusk === undefined ?
                        <div style={{marginTop: 250, marginBottom: 400}}><p className="text"> Запись отсутствует.
                            Рекомендуем получить вакцину в прививочном пункте.
                            Адреса ближайших прививочных пунктов и виды доступных вакцин можно просмотреть здесь </p>
                           <div> <a href="https://vc.emed.gov.kg"> https://vc.emed.gov.kg </a> </div> </div> : <div>
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    <span> {fio} </span>
                                </Typography>
                                <a href={`data:image/jpeg;base64,${photo}`} download>
                                    <img src={`data:image/jpeg;base64,${photo}`} style={{width: 110, height: 150}}
                                         onClick={() => setActive(false)}/>
                                </a>
                                <div className="text-dec">
                                <Typography onClick={() => setActive(false)} variant="body2" color="text.secondary">
                                    {vaccines.map(v => <span key={v.doza} className="text">
                            <span> {v.vaccine_title}: {v.vaccine_name}, {v.vaccination_date}</span>
                        </span>
                                    )}
                                </Typography>
                                </div>
                                <div>
                                    <QRCode
                                        onClick={() => setActive(false)}
                                        value={qrLink}
                                        style={{marginRight: 10, marginBottom: 20, width: 200, height: 200}}
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
                                <a className="ant-btn btn-primary" onClick={() => !active? setActive(true): setActive(false)} >
                                  Получить сертификат
                                </a>
                                <Modal active={active} setActive={setActive} numberId={numberId} inn={inn}
                                       serialId={serialId}/>
                                <div> { analisis?
                                <div onClick={() => setActive(false)} className={active? "button notActive" : "button"}>
                                    <NavLink to="/result" style={{textDecoration: 'none'}}>
                                    <a className="ant-btn btn-primary">
                                        Получить результаты ПЦР
                                    </a>
                                    </NavLink>
                                </div>: null }
                                </div>
                            </CardContent></div>} </div>}
            </div>}
    </div>
}

export default PersonCard