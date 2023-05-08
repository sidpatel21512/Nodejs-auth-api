import mongoose from "mongoose";
import { MONGO_CONNECTION_STRING, MONGO_DB_NAME } from "../utils/constants.js";

export const initializeDBConnection = () => {
    mongoose.connect(MONGO_CONNECTION_STRING, {
        dbName: MONGO_DB_NAME,
    }).then(() => {
        console.log('Database connected successfully');
    }).catch(e => console.error('Error occurred while connecting to the databse: ', e))
};
