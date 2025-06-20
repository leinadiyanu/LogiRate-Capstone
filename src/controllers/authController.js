import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/token.js'
import {sendEmail} from '../utils/email.js'
import crypto from 'crypto';
import { loginValidation, registerValidation, resetPasswordValidation } from '../utils/validate.js';


export const register = async (req, res, next) => {
  try {
    // console.log(req.body)
    const { firstName, surname, email, address, password, confirmPassword } = req.body;

    const { error } = registerValidation.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

    const existingUser = await User.findOne({ email });  //Checks database for email.
    if (existingUser) return res.status(409).json({ message: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const role = email === "logirate1@gmail.com" || "danielakande33@gmail.com" ? "admin" : "user";
    const user = await User.create({ name: {firstName, surname}, email, address, password: hashedPassword, role });
    
    // const token = generateToken({userId: user._id})
    const payload = { id: user._id, email: user.email, role: user.role};
    const token = generateToken(payload);

    res.status(201).json({ token, message: 'Registration successful', user: { id: user._id, email: user.email }});
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { error } = loginValidation.validate( req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

    const user = await User.findOne({ email });
    // console.log(user)
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

    const payload = { id: user._id, email: user.email, role: user.role};
    const token = generateToken(payload);

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

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Email not found' });

    const token = crypto.randomBytes(20).toString('hex');
    user.resetToken = token;
    user.resetTokenExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // Nodemailer setup (Gmail)
    sendEmail(user, token)

    res.status(200).json({ message: 'Password reset email sent', resetToken: token});
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword, confirmPassword } = req.body;

  const { error } = resetPasswordValidation.validate( email, password );

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  // if (newPassword !== confirmPassword) return res.status(400).json({message: 'Password do not match'})

  try {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpires: { $gt: Date.now() }
    });

    if (!user) return res.status(400).json({ message: 'Token invalid or expired' });

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
