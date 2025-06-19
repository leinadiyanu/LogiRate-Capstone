import Review from '../models/reviewModel.js';
import Vendor from '../models/vendorModel.js';


//Creates a User review
export const createReview = async (req, res) => {
    const { vendorId, rating, comment } = req.body;

    if (!vendorId || !rating) {
        return res.status(400).json({ message: 'Vendor and rating are required' });
    }

    try {
        // Ensure vendor exists
        const vendor = await Vendor.findById(vendorId);
        if (!vendor) return res.status(404).json({ message: 'Vendor not found' });


        // Check if user already reviewed this vendor
        const existingReview = await Review.findOne({
            vendorId,
            userId: req.user.id,
    });

    if (existingReview) {
        return res.status(400).json({ message: 'You have already reviewed this vendor' });
    }

    const newReview = await Review.create({
        vendorId,
        userId: req.user.id,
        rating,
        comment,
    });

    res.status(201).json(newReview);
    } catch (err) {
    res.status(500).json({ message: 'Error creating review', error: err.message });
    }
};


//Gets a Vendor reviews
export const getVendorReviews = async (req, res) => {
    const { vendorId } = req.params;

    try {
        const reviews = await Review.find({ vendorId }).populate('userId', 'name email');
        res.status(200).json(reviews);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving reviews', error: err.message });
    }
};

// UPDATE a review (by the same user)
export const updateReview = async (req, res) => {
    const { id } = req.params;
    const { rating, comment } = req.body;

    try {
        const review = await Review.findById(id);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    if (review.userId.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Not authorized to edit this review' });
    }

    review.rating = rating || review.rating;
    review.comment = comment || review.comment;

    await review.save();
    res.status(200).json(review);                                         
    } catch (err) {
        res.status(500).json({ message: 'Error updating review', error: err.message });
    }
};

// DELETE a review (by the same user)
export const deleteReview = async (req, res) => {
    const { id } = req.params;

    try {
        const review = await Review.findById(id);
        if (!review) return res.status(404).json({ message: 'Review not found' });

        if (review.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to delete this review' });
        }

        await review.remove();
        res.status(200).json({ message: 'Review deleted successfully' });     
    } catch (err) {
        res.status(500).json({ message: 'Error deleting review', error: err.message });
    }
}; 