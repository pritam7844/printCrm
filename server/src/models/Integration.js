import mongoose from 'mongoose';

const integrationSchema = new mongoose.Schema(
  {
    tenantId: { type: String, required: true, unique: true },
    provider: { type: String, enum: ['Interakt', 'Wati', 'AiSensy', 'Twilio', 'Custom HTTP Gateway'], default: 'Interakt' },
    baseUrl: { type: String, required: true },
    token: { type: String, select: false },
    authHeader: { type: String, default: 'Authorization' },
    authPrefix: { type: String, default: 'Bearer' },
    fieldMap: {
      name: { type: String, default: 'contact.name' },
      phone: { type: String, default: 'contact.phone' },
      message: { type: String, default: 'message.text' },
      product: { type: String, default: 'message.product' },
      quantity: { type: String, default: 'message.quantity' }
    },
    templates: [
      {
        event: String,
        templateName: String,
        enabled: { type: Boolean, default: true }
      }
    ]
  },
  { timestamps: true }
);

export const Integration = mongoose.model('Integration', integrationSchema);
