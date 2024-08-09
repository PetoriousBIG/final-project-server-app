import mongoose from 'mongoose';
import CommentSchema from './schema.js';

const CommentModel = mongoose.model('Comment', CommentSchema);

export default CommentModel;