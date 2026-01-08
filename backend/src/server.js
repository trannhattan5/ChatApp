import express from 'express';
import dotenv from 'dotenv';
import {
    connectDB
} from './libs/db.js';
import authRoute from './routers/authRouter.js'
import userRoute from './routers/userRouter.js'
import cookieParser from 'cookie-parser';
import { protectedRoute } from './middlewares/authMiddleware.js';
import cors from 'cors'

// Load các biến môi trường từ file .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware để phân tích JSON body
app.use(express.json());
app.use(cookieParser())
app.use(cors({origin:process.env.CLIENT_URL,credentials:true}))


//public route 
app.use('/api/auth', authRoute)

//private route
app.use(protectedRoute)
app.use('/api/users',userRoute)

// Kết nối đến cơ sở dữ liệu MongoDB
connectDB().then(() => {

    // Khởi động server
    app.listen(PORT, () => {
        console.log(`Server đang chạy trên cổng ${PORT}`);
    });

})