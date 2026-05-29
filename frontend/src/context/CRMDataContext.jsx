import React, { createContext, useContext, useMemo, useState } from 'react';
import { ORDER_STAGES, ROLE_OPTIONS } from '../constants';

const CRMDataContext = createContext(null);

const initialLeads = [
  {
    id: 'LD-1042',
    name: 'Reena Sharma',
    phone: '+91 98765 43120',
    product: 'Custom Mugs',
    quantity: 250,
    temperature: 'HOT',
    source: 'WhatsApp',
    assignee: 'Aarav',
    status: 'Quote approved',
    timeAgo: '12 min ago'
  },
  {
    id: 'LD-1041',
    name: 'Kiran Studios',
    phone: '+91 99880 12441',
    product: 'Business Cards',
    quantity: 1000,
    temperature: 'WARM',
    source: 'Meta Ad',
    assignee: 'Meera',
    status: 'Sample requested',
    timeAgo: '48 min ago'
  },
  {
    id: 'LD-1039',
    name: 'Bright Events',
    phone: '+91 91230 45067',
    product: 'Vinyl Banners',
    quantity: 24,
    temperature: 'COLD',
    source: 'Instagram',
    assignee: 'Rohit',
    status: 'Needs follow-up',
    timeAgo: '2 hr ago'
  },
  {
    id: 'LD-1037',
    name: 'Nexa Realty',
    phone: '+91 90012 33991',
    product: 'Acrylic Signage',
    quantity: 12,
    temperature: 'GENERAL',
    source: 'Walk-in',
    assignee: 'Aarav',
    status: 'Qualifying',
    timeAgo: 'Yesterday'
  }
];

const initialOrders = [
  {
    id: 'ORD-2208',
    customer: 'Kiran Studios',
    phone: '+91 99880 12441',
    product: 'Matte Business Cards',
    quantity: 1000,
    total: 18500,
    paid: 10000,
    deadline: '2026-05-30',
    assignee: 'Meera',
    stage: 'production'
  },
  {
    id: 'ORD-2207',
    customer: 'Nexa Realty',
    phone: '+91 90012 33991',
    product: 'Outdoor Hoarding',
    quantity: 2,
    total: 76000,
    paid: 30000,
    deadline: '2026-05-28',
    assignee: 'Rohit',
    stage: 'quality'
  },
  {
    id: 'ORD-2206',
    customer: 'Urban Cafe',
    phone: '+91 97888 54001',
    product: 'Menu Cards',
    quantity: 200,
    total: 12800,
    paid: 12800,
    deadline: '2026-06-03',
    assignee: 'Dev',
    stage: 'ready'
  },
  {
    id: 'ORD-2205',
    customer: 'Bright Events',
    phone: '+91 91230 45067',
    product: 'Event Banners',
    quantity: 24,
    total: 42200,
    paid: 20000,
    deadline: '2026-06-01',
    assignee: 'Aarav',
    stage: 'quoted'
  },
  {
    id: 'ORD-2204',
    customer: 'Reena Sharma',
    phone: '+91 98765 43120',
    product: 'Photo Mugs',
    quantity: 250,
    total: 37500,
    paid: 15000,
    deadline: '2026-06-05',
    assignee: 'Meera',
    stage: 'new'
  }
];

const initialPayments = [
  { id: 'TXN-9021', customer: 'Urban Cafe', method: 'UPI', amount: 12800, date: '2026-05-27', status: 'Paid' },
  { id: 'TXN-9020', customer: 'Kiran Studios', method: 'Bank Transfer', amount: 10000, date: '2026-05-27', status: 'Partial' },
  { id: 'TXN-9018', customer: 'Nexa Realty', method: 'Cheque', amount: 30000, date: '2026-05-26', status: 'Partial' }
];

const initialTeam = [
  { name: 'Pritam Shah', role: 'Owner', status: 'Online', revenue: 218000, closed: 42 },
  { name: 'Meera Joshi', role: 'Sales Agent', status: 'Online', revenue: 93500, closed: 19 },
  { name: 'Rohit Verma', role: 'Production', status: 'Busy', revenue: 71000, closed: 14 },
  { name: 'Dev Patel', role: 'Delivery', status: 'Away', revenue: 38200, closed: 8 }
];

export const CRMDataProvider = ({ children }) => {
  const [activeRole, setActiveRole] = useState(ROLE_OPTIONS[0].value);
  const [leads, setLeads] = useState(initialLeads);
  const [orders, setOrders] = useState(initialOrders);
  const [payments, setPayments] = useState(initialPayments);
  const [providerConfig, setProviderConfig] = useState({
    provider: import.meta.env.VITE_WHATSAPP_PROVIDER || 'Interakt',
    baseUrl: import.meta.env.VITE_WHATSAPP_API_BASE_URL || 'https://api.interakt.ai/v1',
    token: import.meta.env.VITE_WHATSAPP_API_TOKEN || '',
    authHeader: 'Authorization',
    authPrefix: 'Bearer',
    fieldMap: {
      name: 'contact.name',
      phone: 'contact.phone',
      message: 'message.text'
    }
  });

  const metrics = useMemo(() => {
    const revenue = payments.reduce((sum, payment) => sum + payment.amount, 0);
    const outstanding = orders.reduce((sum, order) => sum + order.total - order.paid, 0);
    const overdue = orders.filter((order) => new Date(order.deadline) < new Date('2026-05-29')).length;

    return {
      totalLeads: leads.length,
      activeOrders: orders.filter((order) => order.stage !== 'delivered').length,
      revenue,
      outstanding,
      overdue
    };
  }, [leads, orders, payments]);

  const moveOrder = (orderId, nextStage) => {
    setOrders((currentOrders) =>
      currentOrders.map((order) => (order.id === orderId ? { ...order, stage: nextStage } : order))
    );
  };

  const addLead = (lead) => {
    setLeads((currentLeads) => [{ ...lead, id: `LD-${1043 + currentLeads.length}`, timeAgo: 'Now' }, ...currentLeads]);
  };

  return (
    <CRMDataContext.Provider
      value={{
        activeRole,
        setActiveRole,
        leads,
        orders,
        payments,
        team: initialTeam,
        stages: ORDER_STAGES,
        metrics,
        providerConfig,
        setProviderConfig,
        moveOrder,
        addLead
      }}
    >
      {children}
    </CRMDataContext.Provider>
  );
};

export const useCRMData = () => {
  const context = useContext(CRMDataContext);
  if (!context) throw new Error('useCRMData must be used inside CRMDataProvider');
  return context;
};
