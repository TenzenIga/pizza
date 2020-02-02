import request from 'supertest';

import pool from '../../startup/db';
import key from '../../startup/config';
import jwt from 'jsonwebtoken';
import PromisifiedPool from '../../interfaces/promise';

import server from "../../index";



describe('/orders',()=>{

    let body = 'order history',
        token:string,
        newUser:PromisifiedPool;
   
    beforeEach(async ()=>{
        
        newUser = await pool.query(`INSERT INTO users( username, email, password, date_created )
        VALUES('John', 'test@mail.ru', '123456', NOW())`)
        token = jwt.sign({uid: newUser.insertId, username: 'John', admin: true }, key )
    })
    afterEach( async ()=>{
        server.close();
        await pool.query('DELETE FROM orders')
        await pool.query('DELETE FROM users')
    })

    afterAll( ()=>{
        pool.end()
    })
    describe('GET /', ()=>{
        it('should return all orders', async ()=>{
            await pool.query(`INSERT INTO orders
            ( user_id, body, order_date )
        VALUES 
            ('?', ?, NOW())`, [newUser.insertId, body])

          const res = await request(server).get('/orders').set('x-auth-token', token);
            expect(res.status).toBe(200);
            expect(res.body.some((p:any)=>p.body === body)).toBeTruthy();
        })
    })
    
    describe('POST /', ()=>{
        
        
        const exec = async ():Promise<request.Response>=>{
            
            return await request(server)
                .post('/orders')
                .set('x-auth-token', token)
                .send({body});
        }

        
        it('should save order if it is valid', async ()=>{

            const res = await exec()
            
            const addedOrder = await pool.query('SELECT * from orders WHERE user_id = ?', [newUser.insertId])
            
            expect(addedOrder[0].body === 'order history').toBeTruthy();
        })

        it('should return 401 if client is not logged in', async ()=>{
            token = '';
            
            const res =  await exec();
           
            expect(res.status).toBe(401);
        })
        it('should return 400 if product info is not valid', async ()=>{
               
            body = ''; 
            const res = await exec();
            
            expect(res.status).toBe(400);
        })

       
    })
})
