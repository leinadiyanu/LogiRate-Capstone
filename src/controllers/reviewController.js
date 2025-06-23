import vendorReview from '../models/vendorsReviewModel.js';
import Vendor from '../models/vendorModel.js';
import routeReview from '../models/routeReviewModel.js'
import Route from '../models/routesModel.js'

//Creates a User route-review
export const createRouteReview = async (req, res) => {
    const { routeId } = req.params;
    const { comment, rating } = req.body;
    // console.log(routeId, comment, rating)

    if (!routeId || rating == null || comment == null) {
    return res.status(400).json({ message: 'Your comment and rating on the route are required' });
}

    try {
        // Ensure route exists
        const route = await Route.findById(routeId);
       
        if (!route) {
            return res.status(404).json({ message: 'Route not found' });
        }

        // Check if user already reviewed this route
        const existingReview = await routeReview.findOne({
            routeId,
            userId: req.user.id,
        });
        
        if (existingReview) {
            return res.status(400).json({ message: 'You have already reviewed this route.' });
        }

        const newReview = await routeReview.create({
            routeId,
            userId: req.user.id,
            rating,
            comment,
        });
        console.log(newReview)
        res.status(201).json(newReview);
    } catch (err) {
        res.status(500).json({ message: 'Error creating review', error: err.message });
    }
};

//Creates a User Vendor-Review
export const createVendorReview = async (req, res) => {
    const { vendorId } = req.params;
    const { rating, comment } = req.body;

    if (!vendorId || !rating || !comment) {
        return res.status(400).json({ message: 'Your comment and rating on the vendor are required' });
    }

    try {
        // Ensure vendor exists
        const vendor = await Vendor.findById(vendorId);
        if (!vendor) {
            return res.status(404).json({ message: 'Vendor not found' });
        }

        // Check if user already reviewed this vendor
        const existingReview = await vendorReview.findOne({
            vendorId,
            userId: req.user.id,
        });

        if (existingReview) {
            return res.status(400).json({ message: 'You have already reviewed this vendor.' });
        }

        const newReview = await vendorReview.create({
            vendorId,
            userId: req.user.id,
            rating,
            comment,
        });

        res.status(201).json(newReview);
    } catch (err) {
        res.status(500).json({ message: 'Error creating vendor review', error: err.message });
    }
};

// Gets a Route's reviews
export const getRouteReviews = async (req, res) => {
    const { routeId } = req.params;

    try {
        const reviews = await routeReview.find({ routeId }).populate('userId', 'name email');
        res.status(200).json(reviews);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving route reviews', error: err.message });
    }
};

// Gets a Vendor's reviews
export const getVendorReviews = async (req, res) => {
    const { vendorId } = req.params;

    try {
        const reviews = await vendorReview.find({ vendorId }).populate('userId', 'name email');
        res.status(200).json(reviews);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving vendor reviews', error: err.message });
    }
};


// UPDATE a Route-review (by the same user)
export const updateRouteReview = async (req, res) => {
    const { routeId } = req.params;
    const { rating, comment } = req.body;

    try {
        const review = await routeReview.findById(routeId);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        if (review.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to edit this review' });
        }

        if (!rating && !comment) {
            return res.status(400).json({ message: 'At least one of rating or comment must be provided' });
        }

        review.rating = rating ?? review.rating;
        review.comment = comment ?? review.comment;

        await review.save();
        res.status(200).json(review);
    } catch (err) {
        res.status(500).json({ message: 'Error updating route review', error: err.message });
    }
};



// UPDATE a vendor-review (by the same user)
export const updateVendorReview = async (req, res) => {
    const { vendorReviewId } = req.params;
    const { rating, comment } = req.body;

    try {
        const review = await vendorReview.findById(vendorReviewId);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        if (review.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to edit this review' });
        }

        if (!rating && !comment) {
            return res.status(400).json({ message: 'At least one of rating or comment must be provided' });
        }

        review.rating = rating ?? review.rating;
        review.comment = comment ?? review.comment;

        await review.save();
        res.status(200).json(review);
    } catch (err) {
        res.status(500).json({ message: 'Error updating vendor review', error: err.message });
    }
};

// DELETE a route-review (by the same user)
export const deleteRouteReview = async (req, res) => {
    const { routeReviewId } = req.params;

    try {
        const review = await routeReview.findById(routeReviewId);
        if (!review) return res.status(404).json({ message: 'Review not found' });

        if (review.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to delete this review' });
        }

        await review.deleteOne(); 
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting review', error: err.message });
    }
};


// DELETE a vendor-review (by the same user)
export const deleteVendorReview = async (req, res) => {
    const { vendorReviewId } = req.params;

    try {
        const review = await vendorReview.findById(vendorReviewId);
        if (!review) return res.status(404).json({ message: 'Review not found' });

        if (review.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to delete this review' });
        }

        await review.deleteOne();
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting review', error: err.message });
    }
};
 