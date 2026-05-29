import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { asyncHandler } from './asyncHandler.js';

export const requireAuth = asyncHandler(async (request, _response, next) => {
  const header = request.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) {
    const error = new Error('Authentication token required');
    error.statusCode = 401;
    throw error;
  }

  const payload = jwt.verify(token, process.env.JWT_SECRET || 'printcrm_development_secret_change_me');
  const user = await User.findById(payload.userId).select('-passwordHash');
  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 401;
    throw error;
  }

  request.user = user;
  next();
});

export const allowRoles = (...roles) => (request, _response, next) => {
  if (!roles.includes(request.user.role)) {
    const error = new Error('You do not have permission for this action');
    error.statusCode = 403;
    next(error);
    return;
  }
  next();
};
