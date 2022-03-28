import React, {useEffect, useState} from 'react'
import axios from 'axios'
import CardContent from '@mui/material/CardContent';
import QRCode from "qrcode.react";
import '../App.css';
import Modal from '../Modal/Modal'
import {useSearchParams} from 'react-router-dom';
import Preloader from '../Preloader/Preloader';
import './Card.css'
import Certificates from "../Certificates/Certificates";
import Pcr from "../Pcr/Pcr";
import Error from "../Error/Error";
import VaccineInfo from "../Vaccineinfo/VaccineInfo";

const PersonCard = () => {
    const [expired, setExpired] = useState()
    const [result, setResult] = useState()
    const [positiveResult, setPositiveResult] = useState([])
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
                const result = res.data.propusk.analyzis
                const positiveResult = res.data.positiveanalyzis
                const propusk = res.data.propusk
                const passport = res.data.passport
                const expired = res.data.propusk.expired
                setPropusk(propusk)
                setExpired(expired)
                setResult(result)
                setPassport(passport)
                setPositiveResult(positiveResult)
                console.log(result)
                console.log(positiveResult)
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

    if (err) {
        return <div>
           <Error />
        </div>
    }

    return <div>
        {isFetching || show || propusk === undefined? <Preloader/> :
            <div className='main-block'>
                <CardContent>
                    <div className='firstBlock'>
                        <img src={`data:image/jpeg;base64,${propusk.photo}`} className='userPhoto'
                             onClick={() => setActive(false)}/>
                        <span className='fio'> {propusk.fio} </span>
                    </div>
                    {expired? <div className="expired_block" >
                        <div className="expired_blick_item">
                            <span className="info_icon"></span>
                            <p className="expired_text"> По истечении 6 месяцев минздрав <br/> рекомендует пройти повторную <br/> вакцинацию</p>
                        </div>
                    </div> : null}
                    <VaccineInfo propusk={propusk} />
                    <div className='qrBlock'>
                        <span className='qrText'> Электронный пропуск </span>
                        <QRCode
                            className="QRCode"
                            id="qr-gen"
                            value={propusk.qrLink}
                            style={{width: 180, height: 180}}
                        />
                    </div>
                    <div className="form_radio_group ">
                        <div className="form_radio_group-item" onClick={() => setActive(false)}>
                            <input id="radio-1" type="radio" name="radio" value="1" checked/>
                            <label htmlFor="radio-1" >СЕРТИФИКАТ</label>
                        </div>
                        <div className="form_radio_group-item" onClick={() => {setActive(true)}}>
                            <input id="radio-2" type="radio" name="radio" value="2"/>
                            <label htmlFor="radio-2">ПЦР-ТЕСТЫ</label>
                        </div>
                    </div>
                    {active
                        ?
                        <Pcr  inn={passport.inn} result={result}/>
                        :
                        <Certificates inn={passport.inn} numberId={passport.numberId} serialId={passport.serialId}/>}
                </CardContent></div>}
    </div>
}

export default PersonCard