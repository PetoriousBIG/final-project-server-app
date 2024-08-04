import mongoose from "mongoose";
const restaurantSchema = new mongoose.Schema({
        name: {type: String, required: true},
        description: String,
        rating: Number,
        ratings: [{
            user_id: String,
            rating: Number
        }]
    },
    { collection: "restaurants" }
);
export default restaurantSchema;