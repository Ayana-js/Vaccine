import React, {useEffect, useState} from "react";
import axios from "axios";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import './Result.css'

const Result = () => {
    const [result, setResult] = useState([])
    const [positiveResult, setPositiveResult] = useState([])
    const [data, setData] = useState({})
    const [isFetching, setIsFetching] = useState(false)
    const search = localStorage.getItem('phone')

    useEffect(() => {
    }, [])
    axios.get(`https://ibank2.cbk.kg/minzdrav/covid-pass?phone=` + search,
        {
            mode: 'no-cors',
            'Access-Control-Allow-Origin': '*'
        }).catch(err => console.log(err))
        .then(res => {
            const data = res.data.passport
            const result = res.data.propusk.analyzis
            const positiveResult = res.data.positiveanalyzis
            setData(data)
            setResult(result)
            setPositiveResult(positiveResult)
        })
    useEffect(() => {
        if (isFetching) {
            setTimeout(() => {
                setIsFetching(false)
            } , 5000)}
    }, [isFetching])

    if (isFetching) {
        return <p> Загрузка ... </p>
    }
    return <div className='table'>
        {!result? <p style={{marginTop: 250, marginBottom: 400}}> Данные отсутствуют
        </p> : <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell> <strong> Анализ </strong> </TableCell>
                        <TableCell align="right"> <strong> Результаты </strong> </TableCell>
                        <TableCell align="right"> <strong> Дата </strong> </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {result.map((result) => (
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {result && result.analizName.length > 20? result.analizName.slice(0, -138): result.analizName}
                                 { positiveResult && positiveResult.length > 20? positiveResult.analizName.slice(0, -138): null}
                            </TableCell>
                            <TableCell align="right">{result.labResult? 'Отрицательный': null} {positiveResult? 'Положитьельный': null}</TableCell>
                            <TableCell align="right">{result? result.dateResult.slice(0, -9): null} </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>}
        <a href={`https://ibank2.cbk.kg/minzdrav/pcrcert-pdf-file/?pin=${data.inn}&seriaId=${data.serialId}&nomerId=${data.numberId}`}
           className="ant-btn btn-primary" download
           onClick={() =>  {setIsFetching(true)}}>
            Скачать
        </a>
        <p style={{fontSize: '13px', color: 'grey'}}>
            Данные с государственных лабораторий и сети лабораторий Бoнецкого
        </p>
       </div>
}

export default Result