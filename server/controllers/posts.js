import postModel from '../models/post.js';

export const getPosts = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', countries = '' } = req.query;
    const query = {};

    if (search || countries) {
      const andConditions = [];

      if (search) {
        andConditions.push({
          $or: [
            { title: { $regex: search, $options: 'i' } },
            { tags: { $regex: search, $options: 'i' } }
          ]
        });
      }

      if (countries) {
        const countryArray = countries.split(',');
        const countryRegexs = countryArray.map(c => new RegExp(`^${c}$`, 'i'));
        andConditions.push({ tags: { $in: countryRegexs } });
      }

      if (andConditions.length > 0) {
        query.$and = andConditions;
      }
    }

    const startIndex = (Number(page) - 1) * Number(limit);
    const total = await postModel.countDocuments(query);
    
    // Fetch posts sorted backwards so newest are first
    const posts = await postModel.find(query).sort({ _id: -1 }).limit(Number(limit)).skip(startIndex);
    
    res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / Number(limit)) });
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
