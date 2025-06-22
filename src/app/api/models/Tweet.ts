import mongoose, { Schema, model, models } from 'mongoose';

const tweetSchema = new Schema({
  text: {
    type: String,
    required: true,
    maxlength: 280,
  },
  hashtags: [String],
  image: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  bookmarks: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  retweets: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  replies: [{
    type: Schema.Types.ObjectId,
    ref: 'Reply',
  }],
}, { timestamps: true });

const Tweet = models.Tweet || model('Tweet', tweetSchema);
export default Tweet;