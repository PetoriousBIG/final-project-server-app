import axios from 'axios';

const RecipeRoutes = (app) => {
    const APP_ID = process.env.EDAMAM_APP_ID;
    const APP_KEY = process.env.EDAMAM_APP_KEY;

    app.get('/api/recipes', async (req, res) => {
        try {
            const { query } = req.query;
            if (!query) {
                return res.status(400).json({ error: 'Query parameter is required' });
            }

            const response = await axios.get('https://api.edamam.com/search', {
                params: {
                    q: query,
                    app_id: APP_ID,
                    app_key: APP_KEY,
                    health: 'vegan'
                }
            });

            res.json(response.data.hits);
        } catch (error) {
            console.error('Error fetching recipes:', error);
            res.status(500).json({ error: 'An error occurred while fetching recipes' });
        }
    });

    // fetching specific recipe details
    app.get('/api/recipes/:id', async (req, res) => {
      try {
          const { id } = req.params;
          if (!id) {
              return res.status(400).json({ error: 'Recipe ID is required' });
          }
  
          const decodedId = decodeURIComponent(id);
  
          const response = await axios.get('https://api.edamam.com/api/recipes/v2/by-uri', {
              params: {
                  type: 'public',
                  uri: decodedId,
                  app_id: APP_ID,
                  app_key: APP_KEY
              }
          });
  
          console.log('Full Edamam response:', JSON.stringify(response.data, null, 2));
  
          if (response.data && response.data.recipe) {
              res.json(response.data.recipe);
          } else if (response.data.hits && response.data.hits.length > 0) {
              res.json(response.data.hits[0].recipe);
          } else {
              res.status(404).json({ error: 'Recipe not found' });
          }
      } catch (error) {
          console.error('Error fetching recipe details:', error);
          res.status(500).json({ error: 'An error occurred while fetching recipe details' });
      }
  });
};

export default RecipeRoutes;