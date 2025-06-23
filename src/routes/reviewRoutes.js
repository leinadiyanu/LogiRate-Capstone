import express from 'express';
import {authenticate} from '../middlewares/authMiddleware.js'
import { getVendorReviews, createRouteReview, createVendorReview, getRouteReviews, updateRouteReview, updateVendorReview, deleteRouteReview, deleteVendorReview } from '../controllers/reviewController.js';

const router = express.Router();

// CREATE Vendor and Route review
/**
 * @swagger
 * /reviews/route/{routeId}:
 *   post:
 *     summary: Create a review for a specific route
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: routeId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the route to review
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rating
 *               - comment
 *             properties:
 *               rating:
 *                 type: number
 *                 example: 4
 *               comment:
 *                 type: string
 *                 example: "Yes, they good at what they do and can be trusted"
 *     responses:
 *       201:
 *         description: Review created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                   example: "6854d1622412adc9267df746"
 *                 vendorId:
 *                   type: string
 *                   example: "68573058f24731a2dcb0c22c"
 *                 rating:
 *                   type: number
 *                   example: 4
 *                 comment:
 *                   type: string
 *                   example: "Yes, they good at what they do and can be trusted"
 *                 _id:
 *                   type: string
 *                   example: "6859abf081a7b82fb1f3ceba"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-06-23T19:33:04.777Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-06-23T19:33:04.777Z"
 *                 __v:
 *                   type: integer
 *                   example: 0
 *       400:
 *         description: Bad request (e.g., missing fields)
 *       401:
 *         description: Unauthorized (no token or invalid)
 *       500:
 *         description: Server error
 */
router.post('/route/:routeId', authenticate, createRouteReview);

/**
 * @swagger
 * /reviews/vendor/{vendorId}:
 *   post:
 *     summary: Create a review for a specific vendor
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: vendorId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the vendor to review
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rating
 *               - comment
 *             properties:
 *               rating:
 *                 type: number
 *                 example: 4
 *               comment:
 *                 type: string
 *                 example: "It is a good and fast route"
 *     responses:
 *       201:
 *         description: Review created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                   example: "6854d1622412adc9267df746"
 *                 routeId:
 *                   type: string
 *                   example: "6857321e06d6761d30914b33"
 *                 rating:
 *                   type: number
 *                   example: 4
 *                 comment:
 *                   type: string
 *                   example: "It is a good and fast route"
 *                 _id:
 *                   type: string
 *                   example: "6859b6e839ab4df6653ccd44"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-06-23T20:19:52.895Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-06-23T20:19:52.895Z"
 *                 __v:
 *                   type: integer
 *                   example: 0
 *       400:
 *         description: Bad request (e.g., missing fields)
 *       401:
 *         description: Unauthorized (no token or invalid)
 *       500:
 *         description: Server error
 */
router.post('/vendor/:vendorId',  authenticate, createVendorReview); 

// READ Vendor and Route review
/**
 * @swagger
 * /reviews/route/{routeId}:
 *   get:
 *     summary: Get all reviews for a specific route
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: routeId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the route to fetch reviews for
 *     responses:
 *       200:
 *         description: A list of reviews for the route
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "6859b6e839ab4df6653ccd44"
 *                   userId:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "6854d1622412adc9267df746"
 *                       email:
 *                         type: string
 *                         example: "logirate1@gmail.com"
 *                       name:
 *                         type: object
 *                         properties:
 *                           first:
 *                             type: string
 *                             example: "Logirate"
 *                           surname:
 *                             type: string
 *                             example: ""
 *                   routeId:
 *                     type: string
 *                     example: "6857321e06d6761d30914b33"
 *                   rating:
 *                     type: number
 *                     example: 4
 *                   comment:
 *                     type: string
 *                     example: "It is a good and fast route"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-06-23T20:19:52.895Z"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-06-23T20:19:52.895Z"
 *                   __v:
 *                     type: integer
 *                     example: 0
 *       404:
 *         description: No reviews found for this route
 *       500:
 *         description: Server error
 */
router.get('/route/:routeId', getRouteReviews)

/**
 * @swagger
 * /reviews/vendor/{vendorId}:
 *   get:
 *     summary: Get all reviews for a specific vendor
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: vendorId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the vendor to fetch reviews for
 *     responses:
 *       200:
 *         description: A list of reviews for the vendor
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "68599766d3506..."
 *                   userId:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "6854d1622412adc9...."
 *                       email:
 *                         type: string
 *                         example: "logirate1@gmail.com"
 *                       name:
 *                         type: object
 *                         properties:
 *                           first:
 *                             type: string
 *                             example: "Logirate"
 *                           surname:
 *                             type: string
 *                             example: ""
 *                   vendorId:
 *                     type: string
 *                     example: "68573058f24731a....."
 *                   rating:
 *                     type: number
 *                     example: 5
 *                   comment:
 *                     type: string
 *                     example: "Its a trusted West African transport, thats a good one."
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-06-23T18:05:26.859Z"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-06-23T18:05:26.859Z"
 *                   __v:
 *                     type: integer
 *                     example: 0
 *       404:
 *         description: No reviews found for this vendor
 *       500:
 *         description: Server error
 */
router.get('/vendor/:vendorId', getVendorReviews);

// UPDATE Vendor and Route review
/**
 * @swagger
 * /reviews/route/{routeReviewId}:
 *   patch:
 *     summary: Update an existing review for a specific route
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: routeReviewId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the route review to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *                 example: 3
 *               comment:
 *                 type: string
 *                 example: "They good at what they do, for executive and reliable rides reach them."
 *     responses:
 *       200:
 *         description: Review updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "685997ccd3506...."
 *                 userId:
 *                   type: string
 *                   example: "6854d1622412adc92...."
 *                 routeId:
 *                   type: string
 *                   example: "68573058f24731a2d...."
 *                 rating:
 *                   type: number
 *                   example: 3
 *                 comment:
 *                   type: string
 *                   example: "They good at what they do, for executive and reliable rides reach them."
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-06-23T18:07:08.589Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-06-23T18:29:13.271Z"
 *                 __v:
 *                   type: integer
 *                   example: 0
 *       400:
 *         description: Bad request (e.g., invalid input)
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Review not found
 *       500:
 *         description: Server error
 */
router.patch('/route/:routeReviewId', authenticate, updateRouteReview);

/**
 * @swagger
 * /reviews/vendor/{vendorReviewId}:
 *   patch:
 *     summary: Update an existing review for a specific vendor
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: vendorReviewId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the vendor review to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: number
 *                 example: 3
 *               comment:
 *                 type: string
 *                 example: "They good at what they do, for executive and reliable rides reach them."
 *     responses:
 *       200:
 *         description: Review updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "685997ccd3506....."
 *                 userId:
 *                   type: string
 *                   example: "6854d1622412ad...."
 *                 vendorId:
 *                   type: string
 *                   example: "68573058f24731a...."
 *                 rating:
 *                   type: number
 *                   example: 3
 *                 comment:
 *                   type: string
 *                   example: "They good at what they do, for executive and reliable rides reach them."
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-06-23T18:07:08.589Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-06-23T18:29:13.271Z"
 *                 __v:
 *                   type: integer
 *                   example: 0
 *       400:
 *         description: Bad request (e.g., invalid input)
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Review not found
 *       500:
 *         description: Server error
 */
router.patch('/vendor/:vendorReviewId', authenticate, updateVendorReview);

// DELETE Vendor and Route review
/**
 * @swagger
 * /reviews/route/{routeReviewId}:
 *   delete:
 *     summary: Delete a review for a specific route
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: routeReviewId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the route review to delete
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Review deleted successfully"
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Review not found
 *       500:
 *         description: Server error
 */
router.delete('/route/:routeReviewId', authenticate, deleteRouteReview);

/**
 * @swagger
 * /reviews/vendor/{vendorReviewId}:
 *   delete:
 *     summary: Delete a review for a specific vendor
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: vendorReviewId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the vendor review to delete
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Review deleted successfully"
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Review not found
 *       500:
 *         description: Server error
 */
router.delete('/vendor/:vendorReviewId', authenticate, deleteVendorReview);


export default router;
