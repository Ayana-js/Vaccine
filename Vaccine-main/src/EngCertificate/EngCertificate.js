import React, {useEffect, useState} from "react";
import './EngCertificate.css'
import axios from "axios";
import InputMask from "react-input-mask";
import './libs/fontawesome/all.min.css';

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
    const options = ['AC', 'AN'];
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
    }
    return <div className="mainBlock">
        {isFetching ? <p> Загрузка ... </p> :
            <div>
                <h1 className="text"> Укажите паспортные данные </h1>
                <p style={{fontSize: 13, marginTop: 50}} className="text"> Для получения сертификата на английском языке введите данные с
                    загранпаспорта
                </p>
                <div className='input-content'> 
                    <div className='dropdown-menu'>
                        <div className='dropdown-btn' onClick={(e) => setIsActive(!isActive)}>
                            {option ? options.find(o => o == option) : '№'}
                            <i className={`fa fa-chevron-up fas ${isActive && 'opened'}`}></i>
                        </div>
                        {isActive && (
                            <div className='dropdown-content'>
                                {options.map((o) => (
                                    <div
                                        onClick={(e) => {
                                            setOption(o);
                                            setIsActive(false);
                                        }}
                                        className='dropdown-items'
                                    >
                                        {o}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <InputMask
                        className='ant-input ant-input-number'
                        value={passNumber}
                        onChange={e => setPassNumber(option + e.target.value)}
                        mask="9999999"
                        maskChar="x"
                        placeholder='xxxxxxx'
                    />
                    <label for='text' className='label card-label'>Номер паспорта</label>
                </div>
                    <div>
                        <a onClick={onClickSend} style={{textDecoration: 'none'}}
                         href={`https://ibank2.cbk.kg/minzdrav/get-pdf-file?pin=${inn}&seriaId=${serialId}&nomerId=${numberId}&passId=${str}&passNomer=${num}`}>
                            <a className='ant-btn btn-primary' disabled={!passNumber} onClick={() => setIsFetching(true)} > Получить сертификат  </a>
                        </a>
                    </div>
               </div>}
    </div>
}
export default EngCertificate