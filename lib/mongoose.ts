import mongoose from 'mongoose';
let isConnected = false;

export const ConnectToDB = async() =>{

     mongoose.set("strictQuery" , true);

    if(!process.env.MONGODB_URL){
        return console.log("MongoDB is not available")
    }
    if(isConnected){
        return console.log("MongoDB is already connected")
    }

    try {
        await mongoose.connect(process.env.MONGODB_URL)
        isConnected = true;
        console.log("MongoDB is connected")
    } catch (error) {
        console.log("MongoDB not connected")
    }
}