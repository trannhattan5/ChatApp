// conversation là cuộc trò chuyện
import mongoose from "mongoose";

//thông tin nhóm nếu cuộc trò chuyện là nhóm
const participantSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    joinedAt: {
        type: Date,
        default: Date.now,

    }
}, {
    // _id:false để ko tạo trường
    _id: false

})

const groupSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
    },
    createBy:{
        type:mongoose.Schema.Types.String,
        ref:'User'
    }
},{
    _id:false
})
//thông tin tin nhắn cuối cùng trong cuộc trò chuyện
const lastMessageSchema = new mongoose.Schema({
    _id:{
        type:String
    },
    content:{
        type:String,
        default:null
    },
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    createAt:{
        type:Date,
        default:null
    }
},{_id:false})

const conversationSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['direct', 'group'],
        required: true,

    },
    //những người tham gia cuộc trò chuyện
    participants: {
        type: [participantSchema],
        required: true,
    },
    group:{
        type:groupSchema,
    },
    lastMessageAt:{
        type:Date,
    },
    seenBy:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    lastMessage:{
        type:lastMessageScheme,
        default:null
    },
    unreadCount:{
        type:Map,
        of:Number,
        default:{}
    }
},{timestamps:true})

//tạo index để truy vấn cuộc trò chuyện theo thời gian tin nhắn cuối và người tham gia
conversationSchema.index({lastMessageAt:-1,"participants.userId":1})

const Conversation = mongoose.model('Conversation', conversationSchema);

export default Conversation;