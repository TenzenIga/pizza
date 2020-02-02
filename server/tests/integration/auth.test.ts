import request from 'supertest';

import PromisifiedPool from '../../interfaces/promise';
import pool from '../../startup/db';
import key from '../../startup/config';
import jwt from 'jsonwebtoken';
import server from "../../index";

describe('auth middleware', ()=>{
   
    let newUser =  pool.query(`INSERT INTO users( username, email, password, date_created )
    VALUES('John', 'test@mail.ru', '123456', NOW())`)
    let token = jwt.sign({uid: newUser.insertId, username: 'John', admin: true }, key )
    let name = 'pizza';
    // post to products route
    
    const exec = async ():Promise<request.Response>=>{
        return await request(server)
            .post('/products')
            .set('x-auth-token', token)
            .send({name, price:10, img:'imgsrc' });
    }

    afterEach( async ()=>{
        server.close(); 
    })
    
    afterAll(()=>{
        pool.query('DELETE FROM orders')
        pool.query('DELETE FROM users')
        pool.end()
    })
    it('should return 200 if token is valid', async()=>{
        const res =  await exec();
        expect(res.status).toBe(200);
    })

    it('should return 401 if no token is provided', async()=>{
        token = '';

        const res =  await exec();

        expect(res.status).toBe(401);
    })
    it('should return 400 if token is invalid', async()=>{

        token = 'a';

        const res =  await exec();
        expect(res.status).toBe(400);
    })
    
})
