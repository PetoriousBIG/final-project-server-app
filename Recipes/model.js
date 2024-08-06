import mongoose from 'mongoose';
import RecipeSchema from './schema.js';

const RecipeModel = mongoose.model('Recipe', RecipeSchema);

export default RecipeModel;