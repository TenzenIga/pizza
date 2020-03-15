import mysql from 'mysql'
import { promisify } from 'util'
import env from 'dotenv';
import PromisifiedPool from '../interfaces/promise';
import winston from 'winston';
env.config();

const envString = process.env.NODE_ENV?.toUpperCase()

const pool: PromisifiedPool = mysql.createPool({
    // host:"localhost",
    // user:"root",
    // password:"azer1408",
    // database:"pizza",
    host:process.env.DB_HOST,
    user:process.env['DB_USER_' + envString],
    password:process.env['DB_PASSWORD_' + envString],
    database:process.env.DB_NAME,
    port: 3306
})
pool.getConnection((err, connection) => {
    if (err) {
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.error('Database connection was closed.')
        winston.error(err)
      }
      if (err.code === 'ER_CON_COUNT_ERROR') {
        console.error('Database has too many connections.')
        winston.error(err)
      }
      if (err.code === 'ECONNREFUSED') {
        console.error('Database connection was refused.')
        winston.error(err)
      }
    }
    console.log('connected');
    
    if (connection) connection.release()
  
    return
  })
  
pool.query = promisify(pool.query);

  
export default pool;