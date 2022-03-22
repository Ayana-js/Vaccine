import React, {useEffect, useState} from "react";
import './EngCertificate.css'
import axios from "axios";
import InputMask from "react-input-mask";
import './libs/fontawesome/all.min.css';
import Preloader from "../Preloader/Preloader";

const EngCertificate = () => {
    const [passNumber, setPassNumber] = useState('')
    const [numberId, setNumberId] = useState('')
    const [serialId, setSerialId] = useState('')
    const [inn, setInn] = useState('')
    const [num, setNum] = useState('')
    const [str, setStr] = useState('')
    const [isFetching, setIsFetching] = useState(false)
    const search = localStorage.getItem('phone')
    const [isActive, setIsActive] = useState(false);
    const [option, setOption] = useState('')

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
        console.log(str)
        console.log(num)
    }
    return <div className="mainBlock">
        {isFetching ? <Preloader /> :
            <div>
                <h1 className="text"> Укажите паспортные данные </h1>
                <p className="text__description"> Для получения сертификата на английском <br/> языке введите данные с
                    загранпаспорта
                </p>
                <div className="form__radio_group">
                    <div className="form__content">
                        <div className="form__radio_group-item">
                            <input id="radio-1" type="radio" name="radio" value="1" onChange={() =>setOption('AC')}/>
                            <label htmlFor="radio-1" onClick={() => setOption('AC')}>AC</label>
                        </div>
                        <div className="form__-radio_group-item">
                            <input id="radio-2" type="radio" name="radio" value="2" onChange={() => setOption('AN')}/>
                            <label htmlFor="radio-2" onClick={() => setOption('AN')} >AN</label>
                        </div>
                    </div>
                </div>
                <div>
                    <InputMask
                        className='ant-input ant-input-number'
                        value={passNumber}
                        onChange={e => setPassNumber(option + e.target.value)}
                        mask="9999999"
                        maskChar="x"
                    />
                    {console.log(passNumber)}
                </div>
                <a onClick={onClickSend} style={{textDecoration: 'none'}}
                   href={`https://ibank2.cbk.kg/minzdrav/get-pdf-file?pin=${inn}&seriaId=${serialId}&nomerId=${numberId}&passId=${str}&passNomer=${num}`}
                   download>
                    <span className='ant-btn btn-primary' disabled={!passNumber} onClick={() => setIsFetching(true)} > Получить сертификат  </span>
                </a>
               </div>}
    </div>
}
export default EngCertificate