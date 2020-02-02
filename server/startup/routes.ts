import {Application } from 'express';
import express from 'express';
import products from '../routes/products';
import users from '../routes/users';
import error from '../middleware/error';
import orders from '../routes/orders';
import auth from '../routes/auth';

export default function(app:Application){
    app.use(express.json());
    
    // USERS
    app.use('/users', users)
    
    app.use('/orders', orders)
    // authorization
    app.use('/auth', auth)
    // PRODUCTS
    app.use('/products', products)
    

    // Error handle
     app.use(error)
}