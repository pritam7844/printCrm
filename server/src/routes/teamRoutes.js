import express from 'express';
import { User } from '../models/User.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = express.Router();

router.get(
  '/',
  asyncHandler(async (_request, response) => {
    const members = await User.find().select('-passwordHash').sort({ createdAt: -1 });
    response.json({ members });
  })
);

router.patch(
  '/:id',
  asyncHandler(async (request, response) => {
    const member = await User.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true }).select('-passwordHash');
    if (!member) {
      response.status(404);
      throw new Error('Team member not found');
    }
    response.json({ member });
  })
);

export default router;
