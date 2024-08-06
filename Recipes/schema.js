import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  recipeId: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userName: { type: String, required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Comment', CommentSchema, 'recipe-comment');