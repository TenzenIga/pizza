import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios';
import { UserContext } from '../context/userContext';


export default function Userpage() {
    const {user} = useContext(UserContext)
    const [orders, setOrders] = useState();
    useEffect(() => {
       axios.get('/orders', {headers: {'x-auth-token': user.token}})
       .then(response => setOrders(response.data))
    }, [])

    
    return (
        <div>
            <h2>Orders history</h2>
            
        </div>
    )
}
