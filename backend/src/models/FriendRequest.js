import mongoose from "mongoose";

const friendRequestSchema = new mongoose.Schema({
    from:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    to:{
        type : mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    message:{
        type:String,
        maxlength:300,

    }
    
},{timestamps:true});

// đảm bảo ko có yêu cầu kết bạn trùng lặp
friendRequestSchema.index({from:1,to:1},{unique:true});

//tạo index để tìm các yêu cầu kết bạn gửi từ một người
friendRequestSchema.index({from:1});

//tạo index để tìm các yêu cầu kết bạn nhận từ một người
friendRequestSchema.index({to:1});

const FriendRequest = mongoose.model('FriendRequest',friendRequestSchema);
export default FriendRequest;