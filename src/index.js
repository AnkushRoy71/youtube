import dotenv from 'dotenv'
import connectDB from './db/index.js'
import { app } from './app.js';

dotenv.config({
    path:'../env'
})

app.on('error',(error)=>{
    console.error(`Error in application ` , error);
})
connectDB()
.then(()=>{
    app.listen(process.env.PORT  , ()=>{
      console.log(`Server is running at port : ${process.env.PORT }`)
    })
})
.catch((error)=>{
    console.error(`Database connection failed`)
});