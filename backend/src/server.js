import express from 'express';
import dotenv from 'dotenv';

// Load các biến môi trường từ file .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware để phân tích JSON body
app.use(express.json());

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng ${PORT}`);
});
