import Comment from './schema.js';
import axios from 'axios';

const APP_ID = process.env.EDAMAM_APP_ID;
const APP_KEY = process.env.EDAMAM_APP_KEY;

export const getRecipeDetails = async (id) => {
    try {
      const response = await axios.get('https://api.edamam.com/api/recipes/v2/by-uri', {
        params: {
          type: 'public',
          uri: decodeURIComponent(id),
          app_id: APP_ID,
          app_key: APP_KEY
        }
      });
      console.log('Edamam API response:', response.data);
  
      if (response.data && response.data.recipe) {
        return response.data.recipe;
      } else if (response.data.hits && response.data.hits.length > 0) {
        return response.data.hits[0].recipe;
      } else {
        throw new Error('Recipe not found in Edamam API response');
      }
    } catch (error) {
      console.error('Error fetching recipe details from Edamam:', error);
      throw error;
    }
  };
  

export const searchRecipes = async (query) => {
    try {
        const response = await axios.get('https://api.edamam.com/search', {
            params: {
                q: query,
                app_id: APP_ID,
                app_key: APP_KEY,
                health: 'vegan'
            }
        });

        return response.data.hits;
    } catch (error) {
        console.error('Error searching recipes:', error);
        throw error;
    }
};

export const createComment = async (commentData) => {
  const newComment = new Comment(commentData);
  return await newComment.save();
};

export const getCommentsByRecipeId = async (recipeId) => {
    try {
      const comments = await Comment.find({ recipeId }).sort({ createdAt: -1 });
      console.log(`Found ${comments.length} comments for recipe ${recipeId}`);
      return comments;
    } catch (error) {
      console.error('Error fetching comments from database:', error);
      throw error;
    }
  };