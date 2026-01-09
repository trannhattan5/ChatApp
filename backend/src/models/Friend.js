import mongoose from "mongoose";

const FriendSchema = new mongoose.Schema({
    userA: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,

    },
    userB: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,

    }
},{timestamps:true});


//đảm bảo userA luôn có id lớn hơn userB để tránh trùng lặp
FriendSchema.pre('save',function(next){
    const a = this.userA.toString();
    const b = this.userB.toString();

    //nếu userA < userB thì đổi chỗ
    if(a<b){
        this.userA = mongoose.Types.ObjectId(b);
        this.userB = mongoose.Types.ObjectId(a);
    }
    next();
})

// đảm bảo ko có bạn bè trùng lặp
FriendSchema.index({userA:1,userB:1}, {unique:true})

const Friend = mongoose.model('Friend', FriendSchema)

export default Friend;