import express from 'express';
import { Lead } from '../models/Lead.js';
import { Order } from '../models/Order.js';
import { Payment } from '../models/Payment.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = express.Router();

router.get(
  '/',
  asyncHandler(async (_request, response) => {
    const [totalLeads, activeOrders, payments, overdueOrders, leadTemperature] = await Promise.all([
      Lead.countDocuments(),
      Order.countDocuments({ stage: { $ne: 'delivered' } }),
      Payment.aggregate([{ $group: { _id: null, total: { $sum: '$amount' } } }]),
      Order.countDocuments({ deadline: { $lt: new Date() }, stage: { $ne: 'delivered' } }),
      Lead.aggregate([{ $group: { _id: '$temperature', count: { $sum: 1 } } }])
    ]);

    response.json({
      totalLeads,
      activeOrders,
      revenueCollected: payments[0]?.total || 0,
      overdueOrders,
      leadTemperature
    });
  })
);

export default router;
