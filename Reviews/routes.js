import { connect } from "mongoose";
import * as dao from "./dao.js";
export default function ReviewRoutes(app) {

    const createReview = async (req, res) => {
        const review = await dao.createReview(req.body);
        res.json(review);
    };
    app.post("/api/reviews", createReview);

    const deleteReview = async (req, res) => {
        const status = await dao.deleteReview(req.params.reviewId);
        res.json(status);
    }
    app.delete("/api/reviews/:reviewId", deleteReview);

    const updateReview = async (req, res) => {
        const { reviewId } = req.params;
        const status = await dao.updateReview(reviewId, req.body);
        res.json(status);
    };
    app.put("/api/reviews/:reviewId", updateReview);

    const findReviewById = async (req, res) => {
        const review = await dao.findReviewById(req.params.reviewId);
        res.json(review);
    }
    app.get("/api/reviews/:reviewId", findReviewById);

    const findAllReviews = async (req, res) => {
        const {content_type, content_id, recent} = req.query;
        if (recent) {
            const reviews = await dao.findRecentReviews();
            res.json(reviews);
            return;
        }
        if (content_type && content_id) {
            const reviews = await dao.findReviewsByContent(content_type, content_id);
            res.json(reviews);
            return;
        } 
        const reviews = await dao.findAllReview();
        res.json(reviews)
        return;
    }
    app.get("/api/reviews", findAllReviews);
}