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
 *     summary: Get all vendors with their routes
 *     description: Retrieve a list of all vendors including their associated routes such as origin, destination, price, seats, etc.
 *     tags:
 *       - Vendors
 *     responses:
 *       200:
 *         description: A list of vendors with route details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Vendors fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "60c72b2f9e1d4e23b8a1f403"
 *                       name:
 *                         type: string
 *                         example: "ABC Logistics"
 *                       email:
 *                         type: string
 *                         example: "contact@abclogistics.com"
 *                       phone:
 *                         type: string
 *                         example: "+2348012345678"
 *                       address:
 *                         type: string
 *                         example: "123, Adeola Odeku Street, Victoria Island, Lagos"
 *                       routes:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             from:
 *                               type: string
 *                               example: "Lagos"
 *                             to:
 *                               type: string
 *                               example: "Abuja"
 *                             price:
 *                               type: number
 *                               example: 25000
 *                             availableSeats:
 *                               type: number
 *                               example: 10
 *                             departureTime:
 *                               type: string
 *                               example: "08:00"
 *                             arrivalTime:
 *                               type: string
 *                               example: "14:00"
 *                             vehicleType:
 *                               type: string
 *                               example: "Bus"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An error occurred while fetching vendors
 */
router.get('/allvendors-with-routes', getAllVendorsWithRoutes);

/**
 * @swagger
 * /vendors/{id}:
 *   get:
 *     summary: Get a single vendor by ID
 *     description: Retrieve a single vendor's information along with their route details.
 *     tags:
 *       - Vendors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the vendor to retrieve
 *         schema:
 *           type: string
 *           example: 60c72b2f9e1d4e23b8a1f403
 *     responses:
 *       200:
 *         description: Vendor found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Vendor fetched successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60c72b2f9e1d4e23b8a1f403"
 *                     name:
 *                       type: string
 *                       example: "ABC Logistics"
 *                     email:
 *                       type: string
 *                       example: "contact@abclogistics.com"
 *                     phone:
 *                       type: string
 *                       example: "+2348012345678"
 *                     address:
 *                       type: string
 *                       example: "123, Adeola Odeku Street, Victoria Island, Lagos"
 *                     routes:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           from:
 *                             type: string
 *                             example: "Lagos"
 *                           to:
 *                             type: string
 *                             example: "Abuja"
 *                           price:
 *                             type: number
 *                             example: 25000
 *                           availableSeats:
 *                             type: number
 *                             example: 10
 *                           departureTime:
 *                             type: string
 *                             example: "08:00"
 *                           arrivalTime:
 *                             type: string
 *                             example: "14:00"
 *                           vehicleType:
 *                             type: string
 *                             example: "Bus"
 *       404:
 *         description: Vendor not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Vendor not found
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An error occurred while fetching the vendor
 */
router.get('/:id', getVendorById);



/**
 * @swagger
 * /vendors/filter:
 *   get:
 *     summary: Filter vendors by route details
 *     description: Filter vendors based on route parameters such as origin, destination, price range, available seats, and times.
 *     tags:
 *       - Vendors
 *     parameters:
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *         description: Departure city
 *         example: Lagos
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *         description: Destination city
 *         example: Abuja
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Minimum route price
 *         example: 10000
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Maximum route price
 *         example: 30000
 *       - in: query
 *         name: minSeats
 *         schema:
 *           type: number
 *         description: Minimum available seats
 *         example: 5
 *       - in: query
 *         name: departureTime
 *         schema:
 *           type: string
 *         description: Filter routes departing at or after this time
 *         example: "08:00"
 *       - in: query
 *         name: arrivalTime
 *         schema:
 *           type: string
 *         description: Filter routes arriving at or before this time
 *         example: "18:00"
 *       - in: query
 *         name: vehicleType
 *         schema:
 *           type: string
 *         description: Type of vehicle
 *         example: Bus
 *     responses:
 *       200:
 *         description: Filtered vendors list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Vendors filtered successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
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
 *                             vehicleType:
 *                               type: string
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An error occurred while filtering vendors
 */
router.get('/filter', filterVendorsByRoute);


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

/**
 * @swagger
 * /vendors/update-vendor/{id}:
 *   patch:
 *     summary: Update a vendor by ID (admin only)
 *     tags: [Vendors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the vendor to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VendorUpdate'
 *     responses:
 *       200:
 *         description: Vendor updated successfully
 *       404:
 *         description: Vendor not found
 */
router.patch('/:id', authenticate, authorizeAdmin, updateVendor);

/**
 * @swagger
 * /vendors/delete-vendor/{id}:
 *   delete:
 *     summary: Delete a vendor by ID (admin only)
 *     tags: [Vendors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the vendor to delete
 *     responses:
 *       200:
 *         description: Vendor deleted successfully
 *       404:
 *         description: Vendor not found
 */
router.delete('/delete-vendor/:id', authenticate, authorizeAdmin, deleteVendor);

export default router;
