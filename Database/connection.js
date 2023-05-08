import mongoose from "mongoose";

export const initializeDB = () => {
    mongoose.connect(`mongodb+srv://aviok24:${process.env.NODE_APP_USER_DB_PASSWORD}@free-cluster.pjka4r9.mongodb.net/?retryWrites=true&w=majority`, {
        dbName: 'Free-cluster',
    }).then(() => {
        console.log('Database Connected');
    }).catch(e => console.error('Error occurred while DB connection : ', e))
}