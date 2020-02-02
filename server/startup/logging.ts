import winston from 'winston';

export default function(){
process.on('uncaughtException', (ex)=>{
 
    winston.error(ex.message, ()=>{
      process.exit(1)
    })
});

process.on('unhandledRejection', (ex:any)=>{
  
    winston.error(ex.message, ()=>{
      process.exit(1)
    } )
    
});


winston.configure({
    transports: [
      new (winston.transports.File)({ filename: 'logfile.log' })
    ]
  });
}
