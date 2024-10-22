import postModel from '../models/post.js';

export const getPosts = async (req, res) => {
  try {
    const posts = await postModel.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPosts = async (req, res) => {
  const body = req.body;
  const newPost = new postModel(body);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deletePosts = async (req, res) => {
  const { id } = req.params;
  try {
    //! Find the post by ID and delete it
    const deletedPost = await postModel.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePosts = async (req, res) => {
  const id = req.params.id;
  try {
    //! Find the post by ID and update it with the new data
    const updatedPost = await postModel.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const fetchPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await postModel.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addCommentToPost = async (req, res) => {
  const { id } = req.params;
  const { text, username, profilePic } = req.body;

  try {
    const post = await postModel.findById(id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const newComment = {
      text,
      username,
      profilePic,
      createdAt: new Date()
    };

    post.comments.push(newComment);

    const updatedPost = await post.save();

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error('Error in addCommentToPost:', error);
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};
