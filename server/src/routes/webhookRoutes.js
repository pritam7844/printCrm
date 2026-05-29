import express from 'express';
import { Integration } from '../models/Integration.js';
import { Lead } from '../models/Lead.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = express.Router();

const readPath = (source, path) => path.split('.').reduce((value, key) => value?.[key], source);

router.post(
  '/whatsapp/:tenantId',
  asyncHandler(async (request, response) => {
    const integration = await Integration.findOne({ tenantId: request.params.tenantId });
    const map = integration?.fieldMap || {
      name: 'contact.name',
      phone: 'contact.phone',
      message: 'message.text',
      product: 'message.product',
      quantity: 'message.quantity'
    };

    const lead = await Lead.create({
      tenantId: request.params.tenantId,
      name: readPath(request.body, map.name) || 'WhatsApp Lead',
      phone: readPath(request.body, map.phone) || request.body.phone || 'Unknown',
      product: readPath(request.body, map.product) || 'Print Inquiry',
      quantity: Number(readPath(request.body, map.quantity)) || 1,
      source: 'WhatsApp',
      temperature: 'WARM',
      status: readPath(request.body, map.message) || 'Webhook lead received',
      rawPayload: request.body
    });

    response.status(201).json({ received: true, leadId: lead._id });
  })
);

export default router;
