import mongoose, { Schema, models, model } from 'mongoose';

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  tweets: [{
    type: Schema.Types.ObjectId,
    ref: 'Tweet',
  }],
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'Tweet',
  }],
  bookmarks: [{
    type: Schema.Types.ObjectId,
    ref: 'Tweet',
  }],
  followers: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  following: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
}, { timestamps: true });

const User = models.User || model('User', userSchema);
export default User;
