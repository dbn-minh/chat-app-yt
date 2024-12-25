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

        // Socket io functionality will go here

        // await conversation.save();
        // await newMessage.save();

        // this will run in parallel
        await Promise.all([
          /** @type {Promise<ConversationDocument>} */ (conversation.save()),
          /** @type {Promise<MessageDocument>} */ (newMessage.save())
        ]);

        res.status(201).json(newMessage)
    } catch (err) {
        console.log("Error in sendMessage controller: ", err.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}

export const getMessages = async (req, res) => {
    try {
        const {id: userToChatId} = req.params;
        const senderId = req.user._id;

        /**
         * @type {ConversationDocument | null}
         */

        const conversation = await Conversation.findOne({
            participants: {$all: [senderId, userToChatId]},
        }).populate("messages").exec();

        if(!conversation) return res.status(201).json([]);

        const messages = conversation.messages
        res.status(200).json(messages);
    } catch (err) {
        console.log("Error in getMessages controller: ", err.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}