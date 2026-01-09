import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation',
        required: true,
        index: true
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    content: {
        type: String,
        trim: true,
    },
    imageUrl: {
        type: String,
    },
}, {
    timestamps: true
});

// tạo index để truy vẫn tin nhắn theo cuộc trò chuyện và thời gian tạo
messageSchema.index({conversationId: 1, createAt:-1});

const Message = mongoose.model('Message', messageSchema);

export default Message;