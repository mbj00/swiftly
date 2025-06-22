import mongoose, { Schema, model, models } from 'mongoose';

const replySchema = new Schema({
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
    tweet: {
      type: Schema.Types.ObjectId,
      ref: 'Tweet',
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
  }, { timestamps: true });
  
const Reply = models.Reply || model('Reply', replySchema);
export default Reply;