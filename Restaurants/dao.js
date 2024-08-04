import model from "./model.js";

export const createRestaurant = (restaurant) => {
    delete restaurant._id;
    return model.create(restaurant);
};

export const findAllRestaurants = () => model.find();
export const findRestaurantById = (restaurantId) => model.findById(restaurantId);
export const findRestaurantsByPartialName = (partialName) => {
    const regex = new RegExp(partialName, i); // 'i' makes it case-insensitive
    return model.find({name: {$regex: regex}});
};
export const findRestaurantsWithRatingGTE = (rating) => {
    model.find({rating: {$gte: rating}});
};
export const updateRestaurant = (restaurantId, restaurant) => model.updateOne({_id: restaurantId}, {$set: restaurant});
export const deleteRestaurant = (restaurantId) => model.deleteOne({ _id: restaurantId});