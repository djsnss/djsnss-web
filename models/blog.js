import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  image: { type: String },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  authorName: { type: String, required: true },
  slug: { type: String, required: true, unique: true, lowercase: true }
}, { timestamps: true });

export default mongoose.model('Blog', BlogSchema);
