import request from 'supertest';
import server from '../../index';
import pool from '../../startup/db';


describe('/users', ()=>{
    let username = 'John',
        email = 'test@mail.com',
        password = '12345qwerty';
    
   
        afterEach(async ()=>{
        server.close();
        await pool.query('DELETE FROM orders')
        await pool.query('DELETE FROM users')
        
    })
    afterAll(()=>{
        pool.end()
    })

    describe('POST /', ()=>{
        
        const exec = async ():Promise<request.Response>=>{
            return await request(server)
                .post('/users')
                .send({username, email, password });
        }

        it('Should return 400 if inputs are not valid', async ()=>{
            username = '';
            const res = await exec();
            expect(res.status).toBe(400);

        })

        it('Should return 400 if user already registered', async ()=>{
            username = 'John';
            await pool.query(`INSERT INTO users( username, email, password, date_created )
            VALUES(?, ?, ?, NOW())`, [username, email, password]);
            const res = await exec();
            expect(res.status).toBe(400);
            
        })
        it('Should return 200 if user registred successfully', async ()=>{
            const res = await exec();
            const user = await pool.query('SELECT * FROM users WHERE email = ?', email);

            expect(res.status).toBe(200);
            expect(user[0].email === email).toBeTruthy()
        })
        

    })
})