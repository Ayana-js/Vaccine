import React, {useEffect, useState} from "react";
import axios from "axios";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import './Result.css'

const Result = () => {
    const [result, setResult] = useState([])
    const search = localStorage.getItem('phone')

    useEffect(() => {
        axios.get(`https://ibank2.cbk.kg/minzdrav/covid-pass?phone=` + search,
            {
                mode: 'no-cors',
                'Access-Control-Allow-Origin': '*'
            }).catch(err => console.log(err))
            .then(res => {
                const result = res.data.propusk.positiveanalyzis
                setResult(result)
            })
    }, [])
    return <div className='table'>
        {!result? <p style={{marginTop: 250, marginBottom: 400}}> Данные отсутствуют
        </p> : <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Анализ</TableCell>
                        <TableCell align="right">Результаты</TableCell>
                        <TableCell align="right">Дата</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {result.map((result) => (
                        <TableRow
                            key={result.analizName}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {result.analizName}
                            </TableCell>
                            <TableCell align="right">{result.labResult}</TableCell>
                            <TableCell align="right">{result.dateResult}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>}
        <p style={{fontSize: '13px', color: 'grey'}}>
            Данные с государственных лабораторий и сети лабораторий Бoнецкого
        </p>
       </div>
}

export default Result