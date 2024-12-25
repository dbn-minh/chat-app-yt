import mongoose from 'mongoose';

/**
 * @typedef {Object} ConversationType
 * @property {mongoose.Types.ObjectId[]} participants
 * @property {mongoose.Types.ObjectId[]} messages
 */

/**
 * @typedef {import('mongoose').Document & ConversationType} ConversationDocument
 *
 * Đây là kiểu thực tế cho tài liệu (document) trong MongoDB.
 * - Kế thừa từ `mongoose.Document` để có `_id`, `__v`, ...
 * - Thêm các trường trong `ConversationType`.
 */

const conversationSchema = new mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
      default: [],
    },
  ],
}, {timestamps: true});

/**
 * @type {import('mongoose').Model<ConversationDocument>}
 */
const Conversation = mongoose.model('Conversation', conversationSchema);

export default Conversation;
