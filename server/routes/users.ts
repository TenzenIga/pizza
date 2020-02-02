import pool from "../startup/db"
import express from 'express';
import Joi from '@hapi/joi';
import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import asyncMiddleware from "../middleware/async";
const router = express.Router(); 

//Validation
const schema = Joi.object({
    username:Joi.string()
        .alphanum()
        .min(1)
        .max(30)
        .required(),
    email:Joi.string()
        .email(),
    password:Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  
})

//get user page
router.get('/', asyncMiddleware(async (req:Request, res:Response)=>{
        const ret = await pool.query('SELECt * FROM users')
        res.json(ret)
}))

//Register
router.post('/', asyncMiddleware(async (req:Request, res:Response)=>{
        const {error} = schema.validate(req.body);
        if(error) return res.status(400).send(error.details[0].message);
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt)
        const values = [req.body.username, req.body.email, password];
        const user = await pool.query('SELECT * FROM users WHERE email= ?', req.body.email);
        if(user.length) return res.status(400).send('User already registered');
        const result = await pool.query(`INSERT INTO users( username, email, password, date_created )
                    VALUES(?, ?, ?, NOW())`, values)
        res.status(200).send(result)
}))

export default router;