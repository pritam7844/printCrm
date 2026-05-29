import express from 'express';
import { Integration } from '../models/Integration.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = express.Router();

router.get(
  '/:tenantId',
  asyncHandler(async (request, response) => {
    const integration = await Integration.findOne({ tenantId: request.params.tenantId }).select('+token');
    response.json({ integration });
  })
);

router.put(
  '/:tenantId',
  asyncHandler(async (request, response) => {
    const integration = await Integration.findOneAndUpdate(
      { tenantId: request.params.tenantId },
      { ...request.body, tenantId: request.params.tenantId },
      { new: true, upsert: true, runValidators: true }
    ).select('+token');

    response.json({ integration });
  })
);

export default router;
