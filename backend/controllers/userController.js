import User from "../models/user.model.js";

export const getUsersForSideBar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        // lấy thông tin tất cả người dùng, trừ người đăng nhập
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select('-password');

        res.status(200).json(filteredUsers);
    } catch (err){
        console.log("Error in getUsersForSideBar controller: ", err.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}