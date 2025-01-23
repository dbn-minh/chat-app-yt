/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */

import bcrypt from 'bcryptjs';
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({error: 'Passwords do not match'});
        }
        const user = await User.findOne({username})
        if (user){
            return res.status(400).json({error: 'User already exists'});
        }
        // Hash password here
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        // https://avatar.iran.liara.run
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User({
            fullName,
            username,
            password: hashPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        })
        console.log(newUser)
        if (newUser) {
            // Generate JWT Token here
            generateTokenAndSetCookie(newUser._id, res)
            await newUser.save()

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic,
            });
        } else {
            res.status(401).json({error: 'Invalid user data'});
        }

    } catch(err) {
        console.log("Error in signup controller", err);
        res.status(500).json({error: 'Something went wrong'});
    }
}
export const login = async (req, res) => {
    try {
        const {username, password} = req.body;

        /**
         * @type {UserDocument | null}
         */

        const user = await User.findOne({username}).exec();
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
// Lý do phải có || "" nếu không có us đó thì phần password lấy trong db sẽ có dạng null,
// Nhưng do phần bcrypt compare chỉ có thể nhận string chứ không nhận được null
// Nên nếu không truyền vào chuỗi trống "" thì bcrypt sẽ không thực hiện được và sẽ báo lỗi internal server thay vì wrong pass

        if (!user || !isPasswordCorrect) {
            return res.status(401).json({error: 'Wrong username or password'});
        }

        generateTokenAndSetCookie(user._id, res)
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic
        })
    } catch(err) {
        console.log("Error in login controller", err);
        res.status(500).json({error: 'Something went wrong'});
    }
}
export const logout = (req, res) => {
    try {
        res.clearCookie("jwt", "", {maxAge:0})
        res.status(200).json({message: "Logged out successfully"})
    } catch(err) {
        console.log("Error in logout controller", err);
        res.status(500).json({error: 'Something went wrong'});
    }
}