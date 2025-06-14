import express from 'express';
import { register, login } from '../controllers/authController.js'

const router = express.Router();


router.post('/register', register);
router.post('/login', login);

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