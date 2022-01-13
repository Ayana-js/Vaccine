import axios from "axios";
import React, { useEffect, useState } from "react";

const KgzCertificate = () => {
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
    return <div> {info.map(i => <div> <img src={i.certificate}/>  </div> )}  </div>
}

export default KgzCertificate