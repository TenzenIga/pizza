import request from 'supertest';

import pool from '../../startup/db';
import key from '../../startup/config';
import jwt from 'jsonwebtoken';
import PromisifiedPool from '../../interfaces/promise';

import server from "../../index";


describe('/orders',()=>{

    let newProducts:any,
        token:string,
        newUser:PromisifiedPool,
        products: string | object | undefined;
    beforeEach(async ()=>{
        newUser = await pool.query(`INSERT INTO users( username, email, password, date_created )
        VALUES('John', 'test@mail.ru', '123456', NOW())`)
        token = jwt.sign({uid: newUser.insertId, username: 'John', admin: true }, key )
        await pool.query(`INSERT INTO products
        ( name, description, price, img)
        VALUES
        ('pizza 1', 'pizza 1 decription', '200', 'pizza1.img'),
        ('pizza 2', 'pizza 2 decription', '300', 'pizza4.img')`
        )
        newProducts = await pool.query('SELECT id FROM products')
        
        products = [{product_id:newProducts[0].id, quantity:4, sum:400 }, {product_id:newProducts[1].id, quantity:2, sum:500 }]
        
    })
    afterEach( async ()=>{
        server.close();
        await pool.query('DELETE FROM orderdetail')
        await pool.query('DELETE FROM orders')
        await pool.query('DELETE FROM users')
        await pool.query('DELETE FROM products')
        
    })

    afterAll( ()=>{
        pool.end()
    })
    describe('GET /', ()=>{
        it('should return all users orders', async ()=>{
            let newOrder =  await pool.query(`INSERT INTO orders
                ( user_id, order_date )
                VALUES 
                ('?', NOW())`, [newUser.insertId]);
            let val = [newOrder.insertId, newProducts[0].id, 2, 400];   
            let t = await pool.query(`INSERT INTO orderdetail
                ( order_id, product_id, quantity, sum )
                VALUES
                (?)`, [val]);
        
            const res = await request(server).get('/orders').set('x-auth-token', token);
            console.log(res.body);
            
            expect(res.status).toBe(200);
            
        })
    })
    
    describe('POST /', ()=>{
        const exec = async ():Promise<request.Response>=>{
            return await request(server)
                .post('/orders')
                .set('x-auth-token', token)
                .send({products});
        }

        
        it('should save order if it is valid', async ()=>{

            const res = await exec()
            
            const addedOrder = await pool.query('SELECT * from orders WHERE user_id = ?', [newUser.insertId])
            const addedOrderDetail = await pool.query('SELECT * from orderdetail')            
            expect(addedOrder[0]).toBeTruthy();
            
            expect(addedOrderDetail).toHaveLength(2)
        })

        it('should return 401 if client is not logged in', async ()=>{
            token = '';
            
            const res =  await exec();
           
            expect(res.status).toBe(401);
        })
        it('should return 400 if order info is not valid', async ()=>{
               
            products = ''; 
            const res = await exec();
            
            expect(res.status).toBe(400);
        })

       
    })
})
