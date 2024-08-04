import * as dao from "./dao.js";
export default function RestaurantRoutes(app) {

    const createRestaurant = async (req, res) => {
        const restaurant = await dao.createRestaurant(req.body);
        res.json(restaurant);
    };
    app.post("/api/restaurants", createRestaurant);

    const deleteRestaurant = async (req, res) => {
        const status = await dao.deleteRestaurant(req.params.restaurantId);
        res.json(status);
    }
    app.delete("/api/restaurants/:restaurantId", deleteRestaurant);

    const findAllRestaurants = async (req, res) => {
        const { rating, owner, name } = req.query;
        if (name) {
            const restaurants = await dao.findRestaurantsByPartialName(name);
            res.json(restaurants);
            return;
        }
        if (rating) {
            const restaurants = await dao.findRestaurantsWithRatingGTE(rating);
            res.json(restaurants);
            return;
        }
        if (owner) {
            // TODO
        }
        const restaurants = await dao.findAllRestaurants();
        res.json(restaurants);
        return;
    };
    app.get("/api/restaurants", findAllRestaurants);

    const findRestaurantById = async (req, res) => {
        const restaurant = await dao.findRestaurantById(req.params.restaurantId);
        res.json(restaurant);
    };
    app.get("/api/restaurants/:restaurantId", findRestaurantById);

    const updateRestaurant = async(req, res) => {
        const {restaurantId} = req.params;
        const status = await dao.updateRestaurant(restaurantId, req.body);
        res.json(status);
    };
    app.put("/api/restaurants/:restaurantId", updateRestaurant);
}