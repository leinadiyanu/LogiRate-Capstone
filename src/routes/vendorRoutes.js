import express from 'express';
import { createRoute, createVendor, filterVendorsByRoute, deleteVendor, getAllVendorsWithRoutes, updateVendor, createBulkVendors, getVendorById, addBulkRoutes, } from '../controllers/vendorController.js';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

//For User
/**
 * @swagger
 * tags:
 *   name: Vendors
 *   description: Endpoints for managing vendors
 */
/**
 * @swagger
 * /vendors/allvendors-with-routes:
 *   get:
 *     summary: Get all vendor with full details and routes
 *     tags: [Vendors]
 *     description: Retrieve detailed information about a vendor including services, contact info, ratings, routes, and reviews.
 *     responses:
 *       200:
 *         description: All Vendor details fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "6857054c87cedfcb75923668"
 *                 name:
 *                   type: string
 *                   example: "GIG Mobility"
 *                 shortName:
 *                   type: string
 *                   example: "GIGM"
 *                 logo:
 *                   type: string
 *                   example: "https://nigerialogos.com/logos/gigm/gigm.png"
 *                 description:
 *                   type: string
 *                   example: "GIG Mobility, formerly known as God is Good Motors, is a leading African mobility company..."
 *                 services:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example:
 *                     - Inter-State/City Transportation Services
 *                     - Vehicle Hire
 *                     - Pick-up Service (from various pickup locations)
 *                     - Mobility Platform/App (for booking, tracking, and managing trips)
 *                     - GIG Logistics (separate subsidiary offering courier, e-commerce logistics, freight, warehousing)
 *                 contactInfo:
 *                   type: string
 *                   example: "contact@gigm.com"
 *                 rating:
 *                   type: number
 *                   example: 0
 *                 numberOfRatings:
 *                   type: number
 *                   example: 0
 *                 isVerified:
 *                   type: boolean
 *                   example: true
 *                 __v:
 *                   type: number
 *                   example: 0
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-06-21T19:17:32.823Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-06-21T19:17:32.823Z"
 *                 routes:
 *                   type: array
 *                   items:
 *                     type: object
 *                   example: []
 *       404:
 *         description: Vendor not found
 *       500:
 *         description: Server error
 */
router.get('/allvendors-with-routes', getAllVendorsWithRoutes); 

/**
 * @swagger
 * /vendors/filter:
 *   get:
 *     summary: Get vendors with routes based on filters
 *     description: Retrieve vendors whose routes match specific filters such as origin, destination, price range, seat availability, departure time, etc.
 *     tags:
 *       - Vendors
 *     parameters:
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *         required: false
 *         description: Starting location (e.g. Lagos)
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *         required: false
 *         description: Destination location (e.g. Abuja)
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         required: false
 *         description: Minimum route price
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         required: false
 *         description: Maximum route price
 *       - in: query
 *         name: minSeats
 *         schema:
 *           type: number
 *         required: false
 *         description: Minimum number of available seats
 *       - in: query
 *         name: departureTime
 *         schema:
 *           type: string
 *         required: false
 *         description: Departure time in HH:mm format (e.g. 08:00)
 *       - in: query
 *         name: arrivalTime
 *         schema:
 *           type: string
 *         required: false
 *         description: Arrival time in HH:mm format (e.g. 14:00)
 *       - in: query
 *         name: vehicleType
 *         schema:
 *           type: string
 *         required: false
 *         description: Type of vehicle (e.g. Bus, Car)
 *     responses:
 *       200:
 *         description: A list of vendors with filtered routes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 vendors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       logo:
 *                         type: string
 *                       services:
 *                         type: array
 *                         items:
 *                           type: string
 *                       contactInfo:
 *                         type: string
 *                       rating:
 *                         type: number
 *                       numberOfRatings:
 *                         type: number
 *                       isVerified:
 *                         type: boolean
 *                       routes:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             from:
 *                               type: string
 *                             to:
 *                               type: string
 *                             price:
 *                               type: number
 *                             availableSeats:
 *                               type: number
 *                             departureTime:
 *                               type: string
 *                             arrivalTime:
 *                               type: string
 *                             vehicle:
 *                               type: object
 *                               properties:
 *                                 type:
 *                                   type: string
 *                                 features:
 *                                   type: array
 *                                   items:
 *                                     type: string
 *       400:
 *         description: Invalid query parameters
 *       500:
 *         description: Server error
 */
router.get('/filter', filterVendorsByRoute);


/**
 * @swagger
 * /vendors/{id}:
 *   get:
 *     summary: Get a vendor and its routes
 *     tags: [Vendors]
 *     description: Retrieve a single vendor's information along with all of their associated routes.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Vendor ID
 *     responses:
 *       200:
 *         description: Vendor with route data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 vendor:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "68573058f24731a2dcb0c229"
 *                     name:
 *                       type: string
 *                       example: "GIG Mobility"
 *                     shortName:
 *                       type: string
 *                       example: "GIGM"
 *                     logo:
 *                       type: string
 *                       example: "https://nigerialogos.com/logos/gigm/gigm.png"
 *                     description:
 *                       type: string
 *                       example: "GIG Mobility, formerly known as God is Good Motors, is a leading African mobility company..."
 *                     services:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example:
 *                         - Inter-State/City Transportation Services
 *                         - Vehicle Hire
 *                         - Pick-up Service (from various pickup locations)
 *                         - Mobility Platform/App (for booking, tracking, and managing trips)
 *                         - GIG Logistics (separate subsidiary offering courier, e-commerce logistics, freight, warehousing)
 *                     contactInfo:
 *                       type: string
 *                       example: "contact@gigm.com"
 *                     rating:
 *                       type: number
 *                       example: 0
 *                     numberOfRatings:
 *                       type: number
 *                       example: 0
 *                     isVerified:
 *                       type: boolean
 *                       example: true
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-06-21T22:21:12.499Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-06-21T22:21:12.499Z"
 *                     routes:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "6857321e06d6761d30914b32"
 *                           vendorId:
 *                             type: string
 *                             example: "68573058f24731a2dcb0c229"
 *                           from:
 *                             type: string
 *                             example: "LAGOS-IYANA IPAJA"
 *                           to:
 *                             type: string
 *                             example: "EDO-AUCHI"
 *                           departureTime:
 *                             type: string
 *                             example: "07:30"
 *                           price:
 *                             type: number
 *                             example: 41000
 *                           availableSeats:
 *                             type: number
 *                             example: 13
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                           vehicle:
 *                             type: object
 *                             properties:
 *                               features:
 *                                 type: array
 *                                 items:
 *                                   type: string
 *                                 example: []
 *       404:
 *         description: Vendor not found
 *       500:
 *         description: Server error
 */
router.get('/:id', getVendorById);





//For Admin
/**
 * @swagger
 * /vendors/add-vendor:
 *   post:
 *     summary: Add a single vendor
 *     description: Admin creates a new vendor with basic details.
 *     tags:
 *       - Vendors (Admin)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *                 example: ABC Logistics
 *               email:
 *                 type: string
 *                 example: contact@abclogistics.com
 *               phone:
 *                 type: string
 *                 example: +2348012345678
 *               address:
 *                 type: string
 *                 example: 123 Adeola Odeku, VI, Lagos
 *     responses:
 *       201:
 *         description: Vendor created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/add-vendor', authenticate, authorizeAdmin, createVendor);

/**
 * @swagger
 * /vendors/bulk:
 *   post:
 *     summary: Add multiple vendors (bulk)
 *     description: Admin can upload an array of vendors at once.
 *     tags:
 *       - Vendors (Admin)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               required:
 *                 - name
 *                 - email
 *               properties:
 *                 name:
 *                   type: string
 *                   example: XYZ Transport
 *                 email:
 *                   type: string
 *                   example: xyz@transport.com
 *                 phone:
 *                   type: string
 *                   example: +2348012345679
 *                 address:
 *                   type: string
 *                   example: 10 Allen Avenue, Ikeja, Lagos
 *     responses:
 *       201:
 *         description: Vendors created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/bulk', authenticate, authorizeAdmin, createBulkVendors)

/**
 * @swagger
 * /vendors/{vendorId}/add-route:
 *   post:
 *     summary: Add a single route to a vendor
 *     description: Add a route (from/to, price, vehicle, etc.) to a specific vendor.
 *     tags:
 *       - Routes (Admin)
 *     parameters:
 *       - in: path
 *         name: vendorId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the vendor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - from
 *               - to
 *               - price
 *             properties:
 *               from:
 *                 type: string
 *                 example: Lagos
 *               to:
 *                 type: string
 *                 example: Abuja
 *               price:
 *                 type: number
 *                 example: 20000
 *               availableSeats:
 *                 type: number
 *                 example: 12
 *               departureTime:
 *                 type: string
 *                 example: "08:00"
 *               arrivalTime:
 *                 type: string
 *                 example: "15:00"
 *               vehicleType:
 *                 type: string
 *                 example: Bus
 *     responses:
 *       201:
 *         description: Route added successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/add-route', authenticate, authorizeAdmin, createRoute);

/**
 * @swagger
 * /vendors/{vendorId}/addbulk-routes:
 *   post:
 *     summary: Add multiple routes to a vendor
 *     description: Admin can bulk add several routes for a given vendor.
 *     tags:
 *       - Routes (Admin)
 *     parameters:
 *       - in: path
 *         name: vendorId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the vendor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               required:
 *                 - from
 *                 - to
 *                 - price
 *               properties:
 *                 from:
 *                   type: string
 *                   example: Lagos
 *                 to:
 *                   type: string
 *                   example: Port Harcourt
 *                 price:
 *                   type: number
 *                   example: 25000
 *                 availableSeats:
 *                   type: number
 *                   example: 8
 *                 departureTime:
 *                   type: string
 *                   example: "09:30"
 *                 arrivalTime:
 *                   type: string
 *                   example: "17:00"
 *                 vehicleType:
 *                   type: string
 *                   example: Coaster
 *     responses:
 *       201:
 *         description: Routes added successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/addbulk-routes', authenticate, authorizeAdmin, addBulkRoutes)


router.patch('/:id', authenticate, authorizeAdmin, updateVendor);
router.delete('/delete-vendor/:id', authenticate, authorizeAdmin, deleteVendor);

export default router;
