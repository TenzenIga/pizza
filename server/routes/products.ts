import asyncMiddleware from "../middleware/async";
import { Request, Response, NextFunction } from 'express';
import express from 'express';
import pool from "../startup/db";
import auth from "../middleware/auth";
import admin from "../middleware/admin";
import validateId from "../middleware/validateId";
import Joi from '@hapi/joi';

const router = express.Router(); 

// Product validation
const productSchema = Joi.object({
    name:Joi.string()
        .min(1)
        .max(255)
        .required(),
    price:Joi.number()
        .positive()
        .required(),
    img:Joi.string()
})

// Get all products
router.get('/', asyncMiddleware(async (req:Request, res:Response)=>{
    const ret = await pool.query('SELECt * FROM products');
    res.json(ret)
}));


// get product by id
router.get('/:id',validateId, asyncMiddleware(async (req:Request, res:Response)=>{
    const product  = await pool.query('SELECT * FROM products WHERE id = ?', [req.params.id])    
    res.json(product)
}));


// add products
router.post('/', [auth, admin],asyncMiddleware(async (req:Request, res:Response)=>{
    const {error} = productSchema.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const values = [req.body.name, req.body.price, req.body.img];
    const result = await pool.query(`INSERT INTO products( name, price, img )
    VALUES(?, ?, ?)`, values)
    res.json(result)
}));

// Update products
router.put('/:id',[auth, admin],validateId, asyncMiddleware(async (req:Request, res:Response)=>{
        const {error} = productSchema.validate(req.body);
        if(error) return res.status(400).send(error.details[0].message);
        const values = [req.body.name, req.body.price, req.params.id];
        const product  = await pool.query('UPDATE products SET name = ?, price = ? WHERE id = ?', values )    
        res.json(product)
    }))

// Delete pproducts
router.delete('/:id',[auth, admin], validateId, asyncMiddleware(async (req:Request, res:Response)=>{
    await pool.query('DELETE FROM products WHERE id = ?', [req.params.id])    
    res.status(200).send(`Deleted product with ID: ${req.params.id}`)
}));


export default router;