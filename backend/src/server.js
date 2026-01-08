import express from 'express';
import dotenv from 'dotenv';
import {
    connectDB
} from './libs/db.js';
import authRoute from './routers/authRouter.js'
import cookieParser from 'cookie-parser';

// Load các biến môi trường từ file .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware để phân tích JSON body
app.use(express.json());
app.use(cookieParser())


//public route 
app.use('/api/auth', authRoute)

//private route

// Kết nối đến cơ sở dữ liệu MongoDB
connectDB().then(() => {

    // Khởi động server
    app.listen(PORT, () => {
        console.log(`Server đang chạy trên cổng ${PORT}`);
    });

})