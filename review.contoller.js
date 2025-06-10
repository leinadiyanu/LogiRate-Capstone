const Review = require('../models/review.model');
const Vendor = require('../models/vendor.model');

exports.createReview = async (req, res, next) => {
  try {
    const { vendorId, rating, comment } = req.body;

    const vendor = await Vendor.findById(vendorId);
    if (!vendor) return res.status(404).json({ message: 'Vendor not found' });

    const review = await Review.create({
      vendor: vendorId,
      user: req.user.id,
      rating,
      comment,
    });

    res.status(201).json(review);
  } catch (err) {
    next(err);
  }
};

exports.getReviewsByVendor = async (req, res, next) => {
  try {
    const reviews = await Review.find({ vendor: req.params.vendorId })
      .populate('user', 'email name')
      .sort({ createdAt: -1 });

    res.status(200).json(reviews);
  } catch (err) {
    next(err);
  }
};

exports.deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) return res.status(404).json({ message: 'Review not found' });
    if (review.user.toString() !== req.user.id)
      return res.status(403).json({ message: 'Not authorized to delete this review' });

    await review.deleteOne();

    res.status(200).json({ message: 'Review deleted' });
  } catch (err) {
    next(err);
  }
};