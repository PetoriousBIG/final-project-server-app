import model from "./model.js";

export const createReview = (review) => {
    delete review._id;
    return model.create(review);
}

export const findAllReview = () => model.find();
export const findReviewById = (reviewId) => model.findById(reviewId);
export const findReviewsByContent = (content_type, content_id) => {
    return model.find({content_type: content_type, content_id: content_id})
};
export const findRecentReviews = () => {
    return model.find().sort({'date': -1}.limit(6));
}

export const updateReview = (reviewId, review) => model.updateOne({_id: reviewId}, {$set: review});
export const deleteReview = (reviewId) => model.deleteOne({_id: reviewId});