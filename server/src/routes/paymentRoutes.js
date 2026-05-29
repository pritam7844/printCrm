import express from 'express';
import { Order } from '../models/Order.js';
import { Payment } from '../models/Payment.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = express.Router();

router.get(
  '/',
  asyncHandler(async (_request, response) => {
    const payments = await Payment.find().populate('order', 'customerName product totalAmount paidAmount').sort({ paidAt: -1 });
    response.json({ payments });
  })
);

router.post(
  '/',
  asyncHandler(async (request, response) => {
    const order = await Order.findById(request.body.order);
    if (!order) {
      response.status(404);
      throw new Error('Order not found');
    }

    const payment = await Payment.create({
      ...request.body,
      customerName: request.body.customerName || order.customerName
    });

    order.paidAmount = Math.min(order.totalAmount, order.paidAmount + payment.amount);
    order.activity.push({ body: `Payment recorded: ${payment.amount}` });
    await order.save();

    response.status(201).json({ payment, order });
  })
);

export default router;
