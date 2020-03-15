import asyncMiddleware from "../middleware/async";
import { Request, Response } from 'express';
import express from 'express';
import pool from "../startup/db";
import auth from "../middleware/auth";

import Joi from '@hapi/joi';

const router = express.Router(); 

// Product validation
const productSchema = Joi.object({
    products:Joi.array()
        .required(),
})

// Get all orders
router.get('/',auth, asyncMiddleware(async (req:Request, res:Response)=>{
    const ret = await pool.query(`
    SELECT orderdetail.order_id, orderdetail.quantity, orderdetail.sum, products.name, orders.order_date
    FROM orderdetail
    JOIN products on products.id = orderdetail.product_id
    JOIN orders ON orders.oid = orderdetail.order_id
    WHERE user_id = ?`, [req.user.uid]);
    res.json(ret)
}));



// add products
router.post('/', auth,asyncMiddleware(async (req:Request, res:Response)=>{
    const {error} = productSchema.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const values = [req.user.uid];
    
    const result = await pool.query(`INSERT INTO orders( user_id, order_date )
    VALUES(?, NOW())`, values)
    const order_id = result.insertId;
    
     
    const products = req.body.products.map((p:any)=>[order_id, p.product_id, p.quantity, p.sum])

    await pool.query(`INSERT INTO orderdetail( order_id, product_id, quantity, sum )
    VALUES ? `, [products])
    res.status(200).send('order saved')
}));




export default router;