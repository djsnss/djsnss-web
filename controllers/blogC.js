import Blog from '../models/blog.js';
import { uploadNormal } from '../middlewares/multer.js';
import cloudinary from '../config/cloudinary.js';

export const createBlog = async (req, res, next) => {
  try {
    // console.log('Request body:', req.body);
    // console.log('Request file:', req.file);
    const { title, content, authorName } = req.body;
    if (!title || !content || !authorName) return res.status(400).json({ message: 'Missing required fields' });

    const slug = title.lower().replace(' ', '-');
    
    // check unique slug
    const exists = await Blog.findOne({ slug });
    if (exists) return res.status(409).json({ message: 'Blog with similar title exists' });

    let imageUrl = null;
    if (req.file) {
      const filePath = req.file.path;
      const uploadedUrl = await uploadNormal(filePath);
      imageUrl = uploadedUrl;
      // remove tmp file
      await fs.unlink(filePath).catch(()=>{});
    }

    const blog = await Blog.create({ title, content, authorName, slug, image: imageUrl });
    res.status(201).json(blog);
  } catch (err) {
    next(err);
  }
};

export const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(201).json({"Blogs": blogs});
  } catch (err) {
    next(err);
  }
};

export const getBlogBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const blog = await Blog.findOne({ slug });
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    next(err);
  }
};

export const updateBlog = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const blog = await Blog.findOne({ slug });
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    const { title, content, authorName } = req.body;
    if (title) {
      blog.title = title;
      const newSlug = createSlug(title);
      // ensure uniqueness if slug changed
      if (newSlug !== blog.slug) {
        const exists = await Blog.findOne({ slug: newSlug });
        if (exists) return res.status(409).json({ message: 'Another blog with this title exists' });
        blog.slug = newSlug;
      }
    }
    if (content) blog.content = content;
    if (authorName) blog.authorName = authorName;

    // optional new image
    if (req.file) {
      const filePath = req.file.path;
      const uploadedUrl = await uploadNormal(filePath);
      blog.image = uploadedUrl;
      await fs.unlink(filePath).catch(()=>{});
    }

    const updated = await blog.save();
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const blog = await Blog.findOne({ slug });
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    // Delete image from Cloudinary if exists
    if (blog.image) {
      // Extract public_id from the image URL
      // Cloudinary URLs: https://res.cloudinary.com/<cloud_name>/image/upload/v<version>/<public_id>.<ext>
      const matches = blog.image.match(/\/upload\/(?:v\d+\/)?([^\.]+)\./);
      const publicId = matches ? matches[1] : null;
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    }

    await Blog.findOneAndDelete({ slug });
    res.json({ message: 'Blog deleted' });
  } catch (err) {
    next(err);
  }
};
