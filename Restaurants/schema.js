import mongoose from "mongoose";
const restaurantSchema = new mongoose.Schema({
        name: {type: String, required: true},
        description: String,
        rating: Number,
        owner_id: {type: String, required: true},
        owner: String,
        introduction: String,
        images: [String]
    },
    { collection: "restaurants" }
);
export default restaurantSchema;