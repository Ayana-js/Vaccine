import React, {useState} from "react";

const KgCertificate = () => {
    const [email, setEmail] = useState('')
    return <div>
             <p> Для получения сертификата введите свой e-mail </p>
             <input placeholder="Введите свой e-mail" onChange={(e) => setEmail(e.target.value)}/>
    </div>
}

export default KgCertificate
