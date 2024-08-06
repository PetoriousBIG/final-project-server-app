import * as RecipeDao from "./dao.js";
import Comment from './schema.js';

const RecipeRoutes = (app) => {
    app.get('/api/recipes', async (req, res) => {
        try {
            const { query } = req.query;
            if (!query) {
                return res.status(400).json({ error: 'Query parameter is required' });
            }

            const recipes = await RecipeDao.searchRecipes(query);
            res.json(recipes);
        } catch (error) {
            console.error('Error fetching recipes:', error);
            res.status(500).json({ error: 'An error occurred while fetching recipes' });
        }
    });

    app.get('/api/recipes/:id', async (req, res) => {
      try {
          const id = decodeURIComponent(req.params.id);
          if (!id) {
              return res.status(400).json({ error: 'Recipe ID is required' });
          }
  
          const recipe = await RecipeDao.getRecipeDetails(id);
          if (!recipe) {
              return res.status(404).json({ error: 'Recipe not found' });
          }
  
          const comments = await RecipeDao.getCommentsByRecipeId(id);
  
          res.json({ ...recipe, comments });
      } catch (error) {
          console.error('Error fetching recipe details:', error);
          res.status(500).json({ error: 'An error occurred while fetching recipe details' });
      }
  });

  app.post("/api/recipes/:id/comments", async (req, res) => {
    try {
        console.log('Received comment request for recipe:', req.params.id);
        console.log('Session:', req.session);
        console.log('Current User:', req.session.currentUser);

        // Check if user is logged in and has 'user' role
        if (!req.session.currentUser || req.session.currentUser.role.toLowerCase() !== 'user') {
            return res.status(403).json({ error: 'Only logged-in users can post comments' });
        }

        const { comment } = req.body;
        const recipeId = `http://www.edamam.com/ontologies/edamam.owl#${req.params.id}`; 
        const userId = req.session.currentUser._id;
        const userName = req.session.currentUser.username; 
        console.log('Username:', userName);
        if (!comment) {
            return res.status(400).json({ error: 'Comment is required' });
        }

        const newComment = new Comment({
            recipeId,
            userId,
            userName,
            comment
        });

        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ error: 'An error occurred while adding the comment' });
    }
});

    app.get('/api/recipes/:id/comments', async (req, res) => {
      try {
        const { id } = req.params;
        const comments = await RecipeDao.getCommentsByRecipeId(id);
        res.json(comments);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch comments' });
      }
    });
};

export default RecipeRoutes;