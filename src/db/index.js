import mongoose from "mongoose";
import {DB_NAME} from "../constants.js"

const connectDB = async () =>{
    try{
        const databaseInstance = await mongoose.connect(
          `${process.env.DATABASE_CONNECTION_STRING}/${DB_NAME}`
        );
        console.log('Database connected !! DB Host', databaseInstance.connection.host);
    }
    catch(error){
        console.error('Database Connection Failed', error);
        process.exit(1);
    }
}

export default connectDB;