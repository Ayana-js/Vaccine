import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import QRCode from "qrcode.react";
import { Button } from '@mui/material';
import './App.css';
import { Link } from 'react-router-dom';
import Modal from './Modal';


const PersonCard = () => {
    const [info, setInfo] = useState([])
    const [active, setActive ] = useState(false)
    
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
       

    
   
        return <div> 
           {info.map(info => <div> 
            <Card sx={{ maxWidth: 345 }}>
     
        <CardContent>
        <Typography variant="h5" component="div">
           {info.fio}
          </Typography>
        <img src={`data:image/jpeg;base64,${info.photo}`}/>
        <Typography variant="body2" color="text.secondary">
           {info.vaccines.map(v=> <div>
               <p> {v.vaccine_title}: {v.vaccine_name}, {v.vaccination_date}</p>  
           </div>
           )}    
          </Typography>
        <div>
            <QRCode
               value={info.qrLink} style={{ marginRight: 10, marginBottom: 20 }}
               bgColor={"#ffffff"}
               fgColor={"#007d82"}
               imageSettings={{
                src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXl0zTIsjNomuA8aFLF6WjVFSKw0RwvA8IK4FqlG0IjVNG2yA_wUh6otiH0QEe2R1exFM&usqp=CAU",
                x: null,
                y: null,
                height: 40,
                width: 40,
                excavate: true,
              }}
            />
         </div>
            <Button onClick={ () => setActive(true)} 
                variant="contained" style={{paddingLeft: 13}} >
                Получить сертификат
            </Button>
            <Modal active={active} setActive={setActive} info={info}/>
           
        </CardContent>
        
      </Card>
     
        </div> 
        )}    
     </div>
    }


export default PersonCard