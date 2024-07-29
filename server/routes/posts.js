import express from 'express';
import { getPosts, createPosts, deletePosts, updatePosts, fetchPostById } from '../controllers/posts.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', fetchPostById);
router.post('/', createPosts);
router.delete('/:id', deletePosts);
router.patch('/:id', updatePosts);

export default router;
