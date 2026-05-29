import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    tenantId: { type: String, default: 'default', index: true },
    lead: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead' },
    customerName: { type: String, required: true },
    phone: { type: String, required: true },
    product: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    specs: { type: String },
    designAssets: [
      {
        url: String,
        publicId: String,
        resourceType: String
      }
    ],
    stage: {
      type: String,
      enum: ['new', 'quoted', 'production', 'quality', 'ready', 'delivery', 'delivered'],
      default: 'new',
      index: true
    },
    totalAmount: { type: Number, required: true, min: 0 },
    paidAmount: { type: Number, default: 0, min: 0 },
    deadline: { type: Date, required: true },
    assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    activity: [
      {
        body: String,
        actor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        createdAt: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);

orderSchema.virtual('balanceDue').get(function balanceDue() {
  return Math.max(this.totalAmount - this.paidAmount, 0);
});

orderSchema.set('toJSON', { virtuals: true });

export const Order = mongoose.model('Order', orderSchema);
