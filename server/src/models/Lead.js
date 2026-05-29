import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema(
  {
    body: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

const leadSchema = new mongoose.Schema(
  {
    tenantId: { type: String, default: 'default', index: true },
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true, index: true },
    email: { type: String, trim: true },
    product: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    source: { type: String, enum: ['Meta Ad', 'WhatsApp', 'Instagram', 'Manual', 'Walk-in', 'Referral'], default: 'Manual' },
    temperature: { type: String, enum: ['COLD', 'WARM', 'HOT', 'GENERAL'], default: 'GENERAL' },
    status: { type: String, default: 'New' },
    assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    notes: [noteSchema],
    rawPayload: mongoose.Schema.Types.Mixed
  },
  { timestamps: true }
);

leadSchema.index({ name: 'text', phone: 'text', product: 'text' });

export const Lead = mongoose.model('Lead', leadSchema);
