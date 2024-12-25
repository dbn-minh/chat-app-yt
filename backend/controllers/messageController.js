/**
 * @param {import('express').Request} req - Yêu cầu từ client
 * @param {import('express').Response} res - Phản hồi từ server
 */

import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
    try {
        const {message} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id;

        /**
         * @type {ConversationDocument | null}
         */

        let conversation = await Conversation.findOne({
            participants: {$all: [senderId, receiverId]},
        }).exec();

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            })
        }

        /**
         * @type {MessageDocument}
         */

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })

        if (newMessage){
            conversation.messages.push(newMessage._id)
        }

        res.status(201).json(newMessage)
    } catch (err) {
        console.log("Error in sendMessage controller: ", err.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}