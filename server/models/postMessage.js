import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  username: { type: String },
  tags: [{ type: String }],
  thumbnail: { type: String, required: true },
  likeCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
});

const PostMessage = mongoose.model('Post', postSchema);

export default PostMessage;
