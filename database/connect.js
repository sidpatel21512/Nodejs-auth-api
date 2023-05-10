import mongoose from "mongoose";

export const initializeDBConnection = () => {
    mongoose.connect(process.env.MONGO_CONN_STRING, {
        dbName: process.env.MONGO_DB,
    }).then(() => {
        console.log('Database connected successfully');
    }).catch(e => console.error('Error occurred while connecting to the databse: ', e))
};
