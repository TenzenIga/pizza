import React, {  useState, useEffect } from 'react'
import axios from 'axios';
import { IStore, IUser, IOrder } from '../interface/interface';
import { connect } from 'react-redux';
import {Table } from 'react-bootstrap';
import moment from 'moment';
type userpageProps = {
    user:IUser
}
function Userpage(props:userpageProps) {
    const {user} = props;
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        console.log('start');
        
       axios.get('/orders', {headers: {'x-auth-token': user.token}})
       .then(response => setOrders(response.data))
    }, [user.token])
    
    const tableBody = orders.map((order:IOrder, k) =>{
        console.log(order.order_date);
        
        return  <tr key={k} >
                <td>{order.order_id}</td>
                <td>{order.name}</td>
                <td>{order.quantity}</td>
                <td>{order.sum}</td>
                <td>{moment(order.order_date).format("DD-MM-YYYY")}</td>
            </tr>
    })

    return (
        <div>
            <h2>Orders history</h2>
            <Table striped bordered >
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Sum</th>  
                    <th>Date</th>
                    </tr>                   
                </thead>
                <tbody>
                    {tableBody}
                </tbody>
            </Table>         
        </div>
    )
}


const mapStateToProps = (state:IStore) =>({
    user:state.user
})

export default connect(mapStateToProps)(Userpage)