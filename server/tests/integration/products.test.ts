import request from 'supertest';

import pool from '../../startup/db';
import key from '../../startup/config';
import jwt from 'jsonwebtoken';
import PromisifiedPool from '../../interfaces/promise';

import server from "../../index";



describe('/products',()=>{
    afterEach( async ()=>{
      
        server.close();
        await pool.query('DELETE FROM orders')
        await pool.query('DELETE FROM products')
        await pool.query('DELETE FROM users')
        
    })

    afterAll(()=>{
        pool.end()
    })
    
    describe('GET /', ()=>{
        it('should return all products', async ()=>{
            await pool.query(`INSERT INTO products
            ( name, price, img )
        VALUES 
            ('pizza 1', 20, 'imglink'),
            ('pizza 2', 32, 'imglink');
          `)
          const res = await request(server).get('/products');
            expect(res.status).toBe(200);
            expect(res.body.some((p:any)=>p.name === 'pizza 1')).toBeTruthy();
            expect(res.body.some((p:any)=>p.name === 'pizza 2')).toBeTruthy();
        })
    })
    describe('GET /:id', ()=>{
        it('should return product if valid id passed', async ()=>{
            const pizza = await pool.query(`INSERT INTO products
            ( name, price, img )
        VALUES 
            ('pizza 1', 20, 'imglink')`)

            const res = await request(server).get('/products/' + pizza.insertId);
            expect(res.status).toBe(200);
            expect(res.body[0].id).toEqual(pizza.insertId);
        })
        it('should return 404 if invalid id is passed', async ()=>{
            const res = await request(server).get('/products/jhhj');
            expect(res.status).toBe(404);
        })
    })
    describe('POST /', ()=>{
        let token:string;
        let name:string;
        let newUser:PromisifiedPool;
        
        const exec = async ():Promise<request.Response>=>{
            
            return await request(server)
                .post('/products')
                .set('x-auth-token', token)
                .send({name, price:10, img:'imgsrc' });
        }

        beforeEach(async ()=>{
            newUser =  await pool.query(`INSERT INTO users( username, email, password, date_created )
            VALUES('John', 'test@mail.ru', '123456', NOW())`)
            token = jwt.sign({uid: newUser.insertId, username: 'John', admin: true }, key )
            name = 'pizza';
        })

        it('should return 401 if client is not logged in', async ()=>{
            token = '';
            
            const res =  await exec();
           
            expect(res.status).toBe(401);
        })

        it('should return 403 if user is not admin', async ()=>{
            token = jwt.sign({uid: newUser.insertId, username: 'John', admin: false }, key );
            const res = await exec();
            expect(res.status).toBe(403);
        })

        it('should return 400 if product info is not valid', async ()=>{
               
            name = '';
           
            const res = await exec();
            
            expect(res.status).toBe(400);
        })

        it('should save product if it is valid', async ()=>{

            const res = await exec()
            
            const addedProduct = await pool.query('SELECT * from products WHERE id = ?', [res.body.insertId])
            
            expect(res.body.insertId).toEqual(addedProduct[0].id);
            
            expect(addedProduct[0].name === 'pizza').toBeTruthy();
        })
    })
    describe('PUT /:id', ()=>{
        let token:string;
        let newName:string;
        let newUser:PromisifiedPool;
        let pizza:any;

        const exec = async ():Promise<request.Response>=>{
        

            return await request(server)
                .put('/products/' + pizza.insertId)
                .set('x-auth-token', token)
                .send({name:newName, price:10, img:'imgsrc' });
            
        }

        beforeEach(async ()=>{
            pizza = await pool.query(`INSERT INTO products( name, price, img ) VALUES ('pizza 1', 20, 'imglink')`)
            newUser =  await pool.query(`INSERT INTO users( username, email, password, date_created )
            VALUES('John', 'test@mail.ru', '123456', NOW())`)
            token = jwt.sign({uid: newUser.insertId, username: 'John', admin: true }, key )
            newName = 'pizza';
        })

        it('should return 401 if client is not logged in', async ()=>{
            token = '';
            
            const res =  await exec();
           
            expect(res.status).toBe(401);
        })

        it('should return 403 if user is not admin', async ()=>{
            token = jwt.sign({uid: newUser.insertId, username: 'John', admin: false }, key );
            const res = await exec();
            expect(res.status).toBe(403);
        })

        it('should return 400 if product input is not valid', async ()=>{
               
            newName = '';
           
            const res = await exec();
            
            expect(res.status).toBe(400);
        })
        it('should return 404 if invalid id is passed', async ()=>{
            pizza = 'a'
            const res = await exec();
            expect(res.status).toBe(404);
        })

        it('should update product if id and input data is valid', async ()=>{
           
            await exec()

            const updatedProduct = await pool.query('SELECT * from products WHERE id = ?', [pizza.insertId])
            
            expect(pizza.insertId).toEqual(updatedProduct[0].id);
            
            expect(updatedProduct[0].name === newName).toBeTruthy();
        })
    })
    describe('DELETE /:id', ()=>{
        let token:string;
        let newUser:PromisifiedPool;
        let pizza:any;

        const exec = async ():Promise<request.Response>=>{
            return await request(server)
                .delete('/products/' + pizza.insertId)
                .set('x-auth-token', token)
        }

        beforeEach(async ()=>{
            pizza = await pool.query(`INSERT INTO products( name, price, img ) VALUES ('pizza 1', 20, 'imglink')`)
            newUser =  await pool.query(`INSERT INTO users( username, email, password, date_created )
            VALUES('John', 'test@mail.ru', '123456', NOW())`)
            token = jwt.sign({uid: newUser.insertId, username: 'John', admin: true }, key )
            
        })

        it('should return 401 if client is not logged in', async ()=>{
            token = '';
            const res =  await exec();
            expect(res.status).toBe(401);
        })

        it('should return 403 if user is not admin', async ()=>{
            token = jwt.sign({uid: newUser.insertId, username: 'John', admin: false }, key );
            const res = await exec();
            expect(res.status).toBe(403);
        })

        it('should return 404 if invalid id is passed', async ()=>{
            pizza = 'a'
            const res = await exec();
            expect(res.status).toBe(404);
        })
        it('should return 200 and product deleted', async ()=>{
           
            await exec()

            const deletedProduct = await pool.query('SELECT * from products WHERE id = ?', [pizza.insertId])
            expect(deletedProduct).toHaveLength(0);
        })
    })
    
})
