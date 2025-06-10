import express from 'express';
import { getAllVendors, createVendor } from '../controllers/vendor.controller.js';

const router = express.Router();

router.get('/', getAllVendors);
router.post('/', createVendor);

export default router;
