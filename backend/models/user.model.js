import mongoose from 'mongoose';

/**
 * @typedef {Object} UserType
 * @property {string} fullName
 * @property {string} username
 * @property {string} password     -
 * @property {"male"|"female"} gender
 * @property {string} [profilePic]
 */

/**
 * @typedef {import('mongoose').Document & UserType} UserDocument
 *
 * Đây là kiểu thực tế cho tài liệu (document) trong MongoDB.
 * - Kế thừa từ `mongoose.Document` để có `_id`, `__v`, ...
 * - Thêm các trường trong `UserType`.
 */

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female'],
  },
  profilePic: {
    type: String,
    default: '',
  },
    // createdAt, updatedAt
}, {timestamps: true});

/**
 * @type {import('mongoose').Model<UserDocument>}
 */
const User = mongoose.model('User', userSchema);

export default User;
