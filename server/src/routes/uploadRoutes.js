import express from 'express';
import multer from 'multer';
import { hasCloudinaryConfig, uploadBufferToCloudinary } from '../lib/cloudinary.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { Order } from '../models/Order.js';

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }
});

router.post(
  '/',
  upload.single('file'),
  asyncHandler(async (request, response) => {
    if (!request.file) {
      response.status(400);
      throw new Error('File is required');
    }
    if (!hasCloudinaryConfig) {
      response.status(503);
      throw new Error('Cloudinary credentials are not configured');
    }

    const result = await uploadBufferToCloudinary(request.file.buffer, request.body.folder || 'printcrm/uploads');
    response.status(201).json({
      asset: {
        url: result.secure_url,
        publicId: result.public_id,
        resourceType: result.resource_type,
        bytes: result.bytes
      }
    });
  })
);

router.post(
  '/orders/:orderId/assets',
  upload.single('file'),
  asyncHandler(async (request, response) => {
    if (!request.file) {
      response.status(400);
      throw new Error('File is required');
    }
    if (!hasCloudinaryConfig) {
      response.status(503);
      throw new Error('Cloudinary credentials are not configured');
    }

    const result = await uploadBufferToCloudinary(request.file.buffer, `printcrm/orders/${request.params.orderId}`);
    const order = await Order.findByIdAndUpdate(
      request.params.orderId,
      { $push: { designAssets: { url: result.secure_url, publicId: result.public_id, resourceType: result.resource_type } } },
      { new: true }
    );
    if (!order) {
      response.status(404);
      throw new Error('Order not found');
    }

    response.status(201).json({ order });
  })
);

export default router;
