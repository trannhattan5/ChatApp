import User from '../models/User.js';
import Friend from '../models/Friend.js';
import FriendRequest from '../models/FriendRequest.js';

export const sendFriendRequest = async (req, res) => {
    try {
        const {
            to,
            message
        } = req.body;
        const from = req.user._id;

        if (from === to) {
            return res.status(400).json({
                message: "Không thể gửi yêu cầu kết bạn cho chính mình"
            });
        }

        const userExists = await User.exists({
            _id: to
        });

        if (!userExists) {
            return res.status(404).json({
                message: "Người dùng không tồn tại"
            });
        }

        let userA = from.toString();
        let userB = to.toString();
        if (userA > userB) {
            [userA, userB] = [userB, userA];
        }

        const [alreadyFriends, existingRequest] = await Promise.all([
            Friend.findOne({
                userA,
                userB
            }),
            FriendRequest.findOne({
                $or: [{
                        from,
                        to
                    },
                    {
                        from: to,
                        to: from
                    }
                ]
            })

        ]);


        if (alreadyFriends) {
            return res.status(400).json({
                message: "Hai người đã là bạn bè"
            });
        }
        if (existingRequest) {
            return res.status(400).json({
                message: "Đã có yêu cầu kết bạn tồn tại giữa hai người"
            });
        }

        const request = await FriendRequest.create({
            from,
            to,
            message
        });

        return res.status(201).json({
            message: "Đã gửi yêu cầu kết bạn",
            request
        });

    } catch (error) {
        console.error("Lỗi khi gửi yêu cầu kết bạn", error);
        return res.status(500).json({
            message: "Lỗi hệ thống"
        });

    }

}
export const acceptFriendRequest = (req, res) => {
    try {

    } catch (error) {
        console.error("Lỗi khi chấp nhận yêu cầu kết bạn", error);
        return res.status(500).json({
            message: "Lỗi hệ thống"
        });

    }

}
export const declineFriendRequest = (req, res) => {
    try {

    } catch (error) {
        console.error("Lỗi khi từ chối yêu cầu kết bạn", error);
        return res.status(500).json({
            message: "Lỗi hệ thống"
        });

    }

}
export const getAllFriends = (req, res) => {
    try {

    } catch (error) {
        console.error("Lỗi khi lấy danh sách bạn", error);
        return res.status(500).json({
            message: "Lỗi hệ thống"
        });

    }

}
export const getFriendRequests = (req, res) => {
    try {

    } catch (error) {
        console.error("Lỗi khi lấy danh sách bạn yêu cầu kết bạn", error);
        return res.status(500).json({
            message: "Lỗi hệ thống"
        });

    }

}