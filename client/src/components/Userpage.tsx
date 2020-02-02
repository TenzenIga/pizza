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

    let ordersList = orders && orders.map((key:number,element:any) => <p key={key}>{element.body}</p>  )
    return (
        <div>
            <h2>Orders history</h2>
            {ordersList}
        </div>
    )
}
