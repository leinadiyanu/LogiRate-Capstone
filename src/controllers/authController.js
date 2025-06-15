// export const register = async (req, res) => {
//   try {
//     // Your registration logic
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// export const login = async (req, res) => {
//   try {
//     // Your login logic
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

import User from '../models/userModel.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
// import {JWT_SECRET} from '../config/jwt.js';


export const register = async (req, res, next) => {
  try {
    // console.log(req.body)
    const { first, surname, email, password, confirmPassword } = req.body;

    const existingUser = await User.findOne({ email });  //Checks database for email.
    
    if (existingUser) return res.status(409).json({ message: 'Email already registered' });

    if (password !== confirmPassword) return res.status(400).json({message: 'Password do not match'})

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name: {first, surname}, email, password: hashedPassword });
    
    // const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '24h'});

    res.status(201).json({ message: 'Registration successful', user: { id: user._id, email: user.email }});
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log(user)
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({ token, user: { id: user._id, email: user.email, name: user.name } });
  } catch (err) {
    next(err);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// export const passwordReset = async(req, res, next) => {
//   try {
//     const {email} = req.body;
//     const existingUser = await User.findOne({email});
//     if (!existingUser) return res.status(409).json({ message: 'Email is not registered' });
    

//   } catch (err){
//     next(err);
//   }
// }