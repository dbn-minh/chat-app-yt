import User from "../models/user.model.js";

export const getUsersForSideBar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        const filteredUsers = await User.find({})
    } catch (err){
        console.log("Error in getUsersForSideBar controller: ", err.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}