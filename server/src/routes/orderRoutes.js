import express from 'express';
import { Lead } from '../models/Lead.js';
import { Order } from '../models/Order.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = express.Router();

router.get(
  '/',
  asyncHandler(async (request, response) => {
    const { stage, overdue } = request.query;
    const query = {};
    if (stage) query.stage = stage;
    if (overdue === 'true') query.deadline = { $lt: new Date() };

    const orders = await Order.find(query).populate('lead', 'name source temperature').populate('assignee', 'name role').sort({ deadline: 1 });
    response.json({ orders });
  })
);

router.post(
  '/',
  asyncHandler(async (request, response) => {
    const order = await Order.create(request.body);
    response.status(201).json({ order });
  })
);

router.post(
  '/from-lead/:leadId',
  asyncHandler(async (request, response) => {
    const lead = await Lead.findById(request.params.leadId);
    if (!lead) {
      response.status(404);
      throw new Error('Lead not found');
    }

    const order = await Order.create({
      lead: lead._id,
      customerName: lead.name,
      phone: lead.phone,
      product: request.body.product || lead.product,
      quantity: request.body.quantity || lead.quantity,
      totalAmount: request.body.totalAmount,
      paidAmount: request.body.paidAmount || 0,
      deadline: request.body.deadline,
      assignee: lead.assignee,
      specs: request.body.specs,
      activity: [{ body: 'Converted from lead' }]
    });

    lead.status = 'Converted to order';
    await lead.save();
    response.status(201).json({ order });
  })
);

router.patch(
  '/:id',
  asyncHandler(async (request, response) => {
    const order = await Order.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true });
    if (!order) {
      response.status(404);
      throw new Error('Order not found');
    }
    response.json({ order });
  })
);

router.patch(
  '/:id/stage',
  asyncHandler(async (request, response) => {
    const order = await Order.findByIdAndUpdate(
      request.params.id,
      {
        stage: request.body.stage,
        $push: { activity: { body: `Stage changed to ${request.body.stage}`, actor: request.body.actor } }
      },
      { new: true, runValidators: true }
    );
    if (!order) {
      response.status(404);
      throw new Error('Order not found');
    }
    response.json({ order });
  })
);

export default router;
