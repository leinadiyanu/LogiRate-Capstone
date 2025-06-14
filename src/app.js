import express from 'express'
import authRoutes from "./routes/authRoutes.js";
// import vendorRoutes from "./routes/vendorRoutes.js";
// import reviewRoutes from "./routes/reviewRoutes.js";

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);
// app.use("/vendor", vendorRoutes);
// app.use("/reviews", reviewRoutes);

export default app;