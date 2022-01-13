import axios from "axios";
import React, { useEffect, useState } from "react";

const EngCertificate = () => {
    const [info, setInfo] = useState([])
    
    useEffect(()=> {
        axios.get('http://localhost:3009/info', 
        {
          mode: 'no-cors',
          withCredentials: true,
          headers: {'Access-Control-Allow-Origin': '*'}
        }).then(res => {
            const info = res.data
            setInfo( info )
        })
    }, [])
    return <div> {info.map(i => <div> {i.certificate} </div> )} </div>
}

export default EngCertificate