import express from 'express';
import { getVendorReviews, createReview, updateReview, deleteReview } from '../controllers/reviewcontroller.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Endpoints for managing reviews on vendors
 */

/**
 * @swagger
 * /reviews/all:
 *   get:
 *     summary: Get all reviews
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: A list of all reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Review'
 */
router.get('/all', getVendorReviews);

/**
 * @swagger
 * /reviews/post:
 *   post:
 *     summary: Create a new review
 *     tags: [Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReviewInput'
 *     responses:
 *       201:
 *         description: Review created successfully
 *       400:
 *         description: Bad request
 */
router.post('/post', createReview);

/**
 * @swagger
 * /reviews/edit:
 *   patch:
 *     summary: Update a review
 *     tags: [Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReviewUpdate'
 *     responses:
 *       200:
 *         description: Review updated successfully
 *       404:
 *         description: Review not found
 */
router.patch('/edit', updateReview)

/**
 * @swagger
 * /reviews/delete:
 *   delete:
 *     summary: Delete a review
 *     tags: [Reviews]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the review to delete
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       404:
 *         description: Review not found
 */
router.delete('/delete', deleteReview)

export default router;
