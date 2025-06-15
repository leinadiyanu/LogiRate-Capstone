import express from 'express';
import { register, login, getProfile } from '../controllers/authController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account with first name, surname, email, and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - surname
 *               - email
 *               - password
 *               - confirmPassword
 *             properties:
 *               firstName:
 *                 type: string
 *               surname:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *               confirmPassword:
 *                 type: string
 *                 format: password
 *     responses:
 *       201:
 *         description: Registration successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                 email:
 *                   type: string
 *       400:
 *         description: Passwords do not match
 *       409:
 *         description: Email is already registered
 */
router.post('/register', register);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: Logs in a user using email and password, and returns a JWT token along with user details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Successful login, returns token and user info
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 email:
 *                   type: string
 *       401:
 *         description: Invalid email or password
 */
router.post('/login', login);

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Get the authenticated user's profile
 *     description: Returns the user's profile details including first name, surname, and email/username.
 *     responses:
 *       200:
 *         description: Successfully retrieved user profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 firstName:
 *                   type: string
 *                 surname:
 *                   type: string
 *                 email:
 *                   type: string
 *       404:
 *         description: User not found
 */
router.get('/profile', authenticate, getProfile)

// router.post('/password-reset', passwordReset)

export default router;






// import express from "express";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// // import db from "../";

// const router = express.Router();


// router.post("/signup", (req, res) => {
//     const {name, email, password, confirmPassword} = req.body;
//     console.log(name, email, password, confirmPassword);
//     console.log(req.method)
//     res.sendStatus(201);
// });

// router.post("/login", (req, res) => {
//     const {email, password} = req.body;
//     console.log(email, password)
//     res.sendStatus(201);
// });

// router.post("/reset", (req, res) => {
//     const {email} = req.body;
//     console.log(email)
//     res.sendStatus(201)
// });

// export default router