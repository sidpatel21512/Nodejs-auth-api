import dotenv from 'dotenv';

dotenv.config();
const serverURL = process.env.ENV === 'DEV' ? `http://localhost:${process.env.PORT}/api/v1/` : 'https://issue-portal.onrender.com/api/v1';
export const serverInfo = {
    servers: [
        {
            url: serverURL,
            description: process.env.ENV === 'DEV' ? 'Local Server' : 'Production Server'
        }
    ]
}