import express from 'express';
import { Lead } from '../models/Lead.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

const router = express.Router();

router.get(
  '/',
  asyncHandler(async (request, response) => {
    const { search, source, temperature, assignee } = request.query;
    const query = {};
    if (source) query.source = source;
    if (temperature) query.temperature = temperature;
    if (assignee) query.assignee = assignee;
    if (search) query.$text = { $search: search };

    const leads = await Lead.find(query).populate('assignee', 'name role').sort({ createdAt: -1 });
    response.json({ leads });
  })
);

router.post(
  '/',
  asyncHandler(async (request, response) => {
    const lead = await Lead.create(request.body);
    response.status(201).json({ lead });
  })
);

router.get(
  '/:id',
  asyncHandler(async (request, response) => {
    const lead = await Lead.findById(request.params.id).populate('assignee', 'name role');
    if (!lead) {
      response.status(404);
      throw new Error('Lead not found');
    }
    response.json({ lead });
  })
);

router.patch(
  '/:id',
  asyncHandler(async (request, response) => {
    const lead = await Lead.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true });
    if (!lead) {
      response.status(404);
      throw new Error('Lead not found');
    }
    response.json({ lead });
  })
);

router.post(
  '/:id/notes',
  asyncHandler(async (request, response) => {
    const lead = await Lead.findByIdAndUpdate(
      request.params.id,
      { $push: { notes: { body: request.body.body, author: request.body.author } } },
      { new: true, runValidators: true }
    );
    if (!lead) {
      response.status(404);
      throw new Error('Lead not found');
    }
    response.status(201).json({ lead });
  })
);

export default router;
