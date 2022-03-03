import React, {useEffect, useState} from 'react';
import axios from "axios";

const Moc = () => {
    const [text, setText] = useState('Hello')
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
    return (
        <div>
            {text}
            <button onClick={() => setText('Bye-bye')}> Click </button>
            <a href={`https://ibank2.cbk.kg/minzdrav/pcrcert-pdf-file/?pin=${inn}&seriaId=${serialId}&nomerId=${numberId}`} download> Download </a>
        </div>
    );
};

export default Moc;