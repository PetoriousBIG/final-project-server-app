import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema({
        content_type: {type: String, required: true, enum: ["restaurant", "menu"],},
        content_id: {type: String, required: true},
        reviewer_id: {type: String, required: true},
        reviewer_name: {type: String, required: true},
        review_text: String,
        rating: Number,
        date: Date,
        comments: [{commenter_id: String,
                    commenter_name: String,
                    date: Date,
                    comment_text: String}]
    },
    { collection: "reviews" }
);
export default reviewSchema