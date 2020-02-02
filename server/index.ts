import express from "express";
import routes from './startup/routes';
import logging from './startup/logging';
import prod from './startup/prod';
import path from 'path';
const app = express();

const port = process.env.PORT || 5000;

prod(app);
logging();
routes(app);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, '../../client', 'build', 'index.html'))
    });

}
const server = app.listen(port, ()=>{
    console.log('Started server');
})


export default server;