import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  username: { type: String, required: true },
  profilePic: { type: String },
  createdAt: {
    type: Date,
    default: new Date()
  }
});

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  username: { type: String },
  profilePic: { type: String },
  tags: [{ type: String }],
  activities: [{ type: String }],
  thumbnail: { type: String, required: true },
  comments: [commentSchema],
  googleMap: [{ type: String }],
  createdAt: {
    type: Date,
    default: new Date()
  }
});

const postModel = mongoose.model('Post', postSchema);

export default postModel;
