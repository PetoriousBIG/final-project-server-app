import mongoose from "mongoose";
const menuItemSchema = new mongoose.Schema({
        restaurant_id: {type: String, required: true},
        name: {type: String, required: true},
        description: String,
        price: Number,
        chef_id: {type: String, required: true},
        chef_name: {type: String, required: true},
        chefs_intro: String,
        images: [String]
    },
    { collection: "menu-items" }
);
export default menuItemSchema;