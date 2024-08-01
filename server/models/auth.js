import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String },
  picture: { type: String }
});

const authModel = mongoose.model('User', postSchema);

export default authModel;
