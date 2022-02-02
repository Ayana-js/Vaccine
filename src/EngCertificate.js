import React, {useEffect, useState} from "react";
import './EngCertificate.css'
import axios from "axios";

const EngCertificate = () => {
    const [passNumber, setPassNumber] = useState('')
    const [numberId, setNumberId] = useState('')
    const [serialId, setSerialId] = useState('')
    const [inn, setInn] = useState('')
    const [num, setNum] = useState('')
    const [str, setStr] = useState('')
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
                <h1 className="text"> Укажите паспортные данные </h1>
                <p style={{fontSize: 13, marginTop: 50}} className="text"> Для получения сертификата на английском языке введите данные с
                    загранпаспорта</p>
                <div className='main-input'>
                    <input type='text' className='main-input-content' placeholder='Номер загранпаспорта' onChange={(e) => setPassNumber(e.target.value)}/>
                </div>
                <p style={{fontSize: 11, color: '#cccccc', marginBottom: 100}}> Введите заглавные буквы и номер без
                    пробелов</p>
                    <div>
                        <a onClick={onClickSend} style={{textDecoration: 'none'}}
                         href={`https://ibank2.cbk.kg/minzdrav/get-pdf-file?pin=${inn}&seriaId=${serialId}&nomerId=${numberId}&passId=${str}&passNomer=${num}`}
                          target="_blank"
                           download>
                            <button  data-title="Введите номер загранпаспорта" className='ant-btn btn-primary' disabled={!passNumber} onClick={() => setIsFetching(true)} > Получить сертификат  </button>
                        </a>
                    </div>
               </div>}
    </div>
}
export default EngCertificate