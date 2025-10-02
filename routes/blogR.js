import express from 'express';
import {
  createBlog, getAllBlogs, getBlogBySlug, updateBlog, deleteBlog
} from '../controllers/blogC.js';
import { authAdmin } from '../middlewares/authVerify.js';
import { uploadNormal } from '../middlewares/multer.js';

const router = express.Router();

router.get('/', getAllBlogs);
router.get('/:slug', getBlogBySlug);
router.post('/', authAdmin,  uploadNormal.single('image'), createBlog);
router.put('/:slug', authAdmin,  uploadNormal.single('image'), updateBlog);
router.delete('/:slug', authAdmin, deleteBlog);

export default router;
