import Joi from '@hapi/joi';
import express from 'express';
import asyncMiddleware from '../middleware/async';
import bcrypt from 'bcrypt';
import { Request, Response} from 'express';
import pool from '../startup/db';
import jwt from 'jsonwebtoken';
import key from '../startup/config';

const router = express.Router(); 


const schema = Joi.object({
    email:Joi.string()
        .email()
        .required(),
    password:Joi.string()
        .required()
})

router.post('/', asyncMiddleware(async(req:Request, res:Response)=>{
    const {error} = schema.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const email = req.body.email
    let user = await pool.query('SELECT * FROM users WHERE email= ?',[email] )   
    //if 0 
    if(!user.length) return res.status(400).send('Неправильный email или пароль.')
    const validPassword = await bcrypt.compare(req.body.password, user[0].password)
    if(!validPassword) return res.status(400).send('Неправильный email или пароль.')
    const token = jwt.sign({uid: user[0].uid, username: user[0].username, admin: user[0].isAdmin }, key )
    res.status(200).send({token:token, user: {username:user[0].username, uid:user[0].uid, admin:user[0].isAdmin }})
   
}))
export default router