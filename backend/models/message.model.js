import mongoose from 'mongoose';

/**
 * @typedef {Object} MessageType
 * @property {mongoose.Types.ObjectId} senderId
 * @property {mongoose.Types.ObjectId} receiverId
 * @property {string} message
 */

/**
 * @typedef {import('mongoose').Document & MessageType} MessageDocument
 *
 * Đây là kiểu thực tế cho tài liệu (document) trong MongoDB.
 * - Kế thừa từ `mongoose.Document` để có `_id`, `__v`, ...
 * - Thêm các trường trong `MessageType`.
 */

const messageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
}, {timestamps: true});

/**
 * @type {import('mongoose').Model<MessageDocument>}
 */
const Message = mongoose.model('Message', messageSchema);

export default Message;
