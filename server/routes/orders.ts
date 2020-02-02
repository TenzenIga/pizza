import asyncMiddleware from "../middleware/async";
import { Request, Response, NextFunction } from 'express';
import express from 'express';
import pool from "../startup/db";
import auth from "../middleware/auth";

import Joi from '@hapi/joi';

const router = express.Router(); 

// Product validation
const productSchema = Joi.object({
    body:Joi.string()
        .min(1)
        .max(255)
        .required(),
})

// Get all orders
router.get('/',auth, asyncMiddleware(async (req:Request, res:Response)=>{
    const ret = await pool.query('SELECt * FROM orders');
    res.json(ret)
}));



// add products
router.post('/', auth,asyncMiddleware(async (req:Request, res:Response)=>{
    const {error} = productSchema.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const values = [req.user.uid, req.body.body];
    const result = await pool.query(`INSERT INTO orders( user_id, body, order_date )
    VALUES(?, ?, NOW())`, values)
    res.json(result)
}));




export default router;