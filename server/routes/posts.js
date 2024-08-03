import express from 'express';
import {
  getPosts,
  createPosts,
  deletePosts,
  updatePosts,
  fetchPostById,
  addCommentToPost
} from '../controllers/posts.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', fetchPostById);
router.post('/', createPosts);
router.delete('/:id', deletePosts);
router.patch('/:id', updatePosts);
router.post('/:id/comments', addCommentToPost);

export default router;
