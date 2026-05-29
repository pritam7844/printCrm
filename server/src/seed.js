import dotenv from 'dotenv';
import { connectDatabase } from './lib/database.js';
import { Integration } from './models/Integration.js';
import { Lead } from './models/Lead.js';
import { Order } from './models/Order.js';
import { Payment } from './models/Payment.js';
import { User } from './models/User.js';

dotenv.config();

await connectDatabase();

await Promise.all([User.deleteMany(), Lead.deleteMany(), Order.deleteMany(), Payment.deleteMany(), Integration.deleteMany()]);

const passwordHash = await User.hashPassword('printcrm123');
const [owner, sales, production] = await User.create([
  { name: 'Pritam Shah', email: 'owner@printcrm.test', passwordHash, role: 'OWNER', status: 'Online' },
  { name: 'Meera Joshi', email: 'sales@printcrm.test', passwordHash, role: 'SALES', status: 'Online' },
  { name: 'Rohit Verma', email: 'production@printcrm.test', passwordHash, role: 'PRODUCTION', status: 'Busy' }
]);

const leads = await Lead.create([
  { name: 'Reena Sharma', phone: '+91 98765 43120', product: 'Custom Mugs', quantity: 250, source: 'WhatsApp', temperature: 'HOT', assignee: sales._id },
  { name: 'Kiran Studios', phone: '+91 99880 12441', product: 'Business Cards', quantity: 1000, source: 'Meta Ad', temperature: 'WARM', assignee: sales._id }
]);

const orders = await Order.create([
  {
    lead: leads[1]._id,
    customerName: 'Kiran Studios',
    phone: '+91 99880 12441',
    product: 'Matte Business Cards',
    quantity: 1000,
    totalAmount: 18500,
    paidAmount: 10000,
    deadline: new Date('2026-05-30'),
    assignee: production._id,
    stage: 'production'
  }
]);

await Payment.create({
  order: orders[0]._id,
  customerName: 'Kiran Studios',
  amount: 10000,
  method: 'Bank Transfer',
  referenceId: 'BANK-9020',
  collectedBy: owner._id,
  status: 'Partial'
});

await Integration.create({
  tenantId: 'tenant-demo',
  provider: 'Interakt',
  baseUrl: 'https://api.interakt.ai/v1',
  token: 'demo-token'
});

console.log('Seed complete. Login: owner@printcrm.test / printcrm123');
process.exit(0);
