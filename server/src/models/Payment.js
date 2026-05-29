import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    tenantId: { type: String, default: 'default', index: true },
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    customerName: { type: String, required: true },
    amount: { type: Number, required: true, min: 1 },
    method: { type: String, enum: ['UPI', 'Cash', 'Bank Transfer', 'Cheque'], required: true },
    referenceId: { type: String },
    collectedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['Paid', 'Partial', 'Refunded'], default: 'Partial' },
    paidAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export const Payment = mongoose.model('Payment', paymentSchema);
