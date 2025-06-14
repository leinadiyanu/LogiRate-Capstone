// Start server - Launches the Express Server

import app from '../src/app.js';
import { swaggerUi, swaggerSpec } from "./config/swagger.js";
import connectDB from './config/db.js';

connectDB();

const PORT = process.env.PORT || 5000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))


app.get("/", (req, res) => {
    res.sendStatus(200)
});


app.listen(PORT, () => {
    console.log(`Server is running in port ${PORT}`)
});


