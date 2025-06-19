import express from 'express'
import authRoutes from "./routes/authRoutes.js";
import vendorRoutes from "./routes/vendorRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import { authenticate } from './middlewares/authMiddleware.js';
import { getProfile } from './controllers/authController.js';

const app = express();

app.use(express.json());

app.get("/profile", authenticate, getProfile);

app.use("/auth", authRoutes);
app.use("/vendors", vendorRoutes);
app.use("/reviews", reviewRoutes);

export default app;