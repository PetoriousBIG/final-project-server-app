import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("RestaurantModel", schema);
export default model;