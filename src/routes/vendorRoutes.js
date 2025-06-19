import express from 'express';
import { createVendor, deleteVendor, filterVendors, getAllVendors, updateVendor, } from '../controllers/vendorController.js';

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
 * /vendors:
 *   get:
 *     summary: Get all vendors
 *     tags: [Vendors]
 *     parameters:
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter vendors by city
 *       - in: query
 *         name: service
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter vendors by service type
 *     responses:
 *       200:
 *         description: A list of vendors (filtered or all)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vendor'
 */
router.get('/', getAllVendors);

/**
 * @swagger
 * /vendors/?:
 *   get:
 *     summary: Filter vendors by id, service and city
 *     tags: [Vendors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the vendor to retrieve
 *     responses:
 *       200:
 *         description: Vendor found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vendor'
 *       404:
 *         description: Vendor not found
 */
router.get('/', filterVendors);


//For Admin
/**
 * @swagger
 * /vendors/admin:
 *   post:
 *     summary: Create a new vendor (admin only)
 *     tags: [Vendors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VendorInput'
 *     responses:
 *       201:
 *         description: Vendor created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/admin', createVendor);


/**
 * @swagger
 * /vendors/admin/{id}:
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
router.patch('/admin/:id', updateVendor);

/**
 * @swagger
 * /vendors/admin/{id}:
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
router.delete('/admin/:id', deleteVendor);

export default router;
