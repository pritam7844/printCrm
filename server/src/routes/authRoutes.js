import express from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();
const jwtSecret = () => process.env.JWT_SECRET || 'printcrm_development_secret_change_me';

const signToken = (user) =>
  jwt.sign({ userId: user._id, role: user.role }, jwtSecret(), {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });

router.post(
  '/register',
  asyncHandler(async (request, response) => {
    const { name, email, password, role = 'OWNER' } = request.body;
    if (!name || !email || !password) {
      response.status(400);
      throw new Error('Name, email and password are required');
    }

    const exists = await User.exists({ email });
    if (exists) {
      response.status(409);
      throw new Error('Email already registered');
    }

    const passwordHash = await User.hashPassword(password);
    const user = await User.create({ name, email, passwordHash, role, status: 'Online' });
    response.status(201).json({
      token: signToken(user),
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  })
);

router.post(
  '/login',
  asyncHandler(async (request, response) => {
    const { email, password } = request.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      response.status(401);
      throw new Error('Invalid email or password');
    }

    user.status = 'Online';
    await user.save();
    response.json({
      token: signToken(user),
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  })
);

router.get(
  '/me',
  requireAuth,
  asyncHandler(async (request, response) => {
    response.json({ user: request.user });
  })
);

export default router;
