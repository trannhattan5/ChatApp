import mongoose from "mongoose";
import { use } from "react";

// Định nghĩa schema cho User
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    displayName: {
        type: String,
        required: true,
        trim: true
    },
    avatarUrl: {
        type: String,// URL ảnh đại diện
 
    },
    avatarId: {
        type:String // Cloudinary public_id để xóa ảnh nếu cần
    },
    bio:{
        type:String,
        maxLength:500  ,// tùy
    },
    phone:{
        type:String,
        sparse:true // cho phép null nhưng vẫn unique
    }
},{
    //tham số thứ 2 là 1 phần cấu hình
    timestamps:true // Tự động thêm createdAt và updatedAt
});

const User = mongoose.model('User',userSchema);
export default User;