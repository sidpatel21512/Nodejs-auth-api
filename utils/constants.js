import dotnev from 'dotenv';

dotnev.config();

export const MONGO_CONNECTION_STRING = `mongodb+srv://aviok24:${process.env.DB_PASSWORD}@free-cluster.pjka4r9.mongodb.net/?retryWrites=true&w=majority`;
export const MONGO_DB_NAME = 'Free-cluster';
