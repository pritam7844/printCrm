import React from 'react';
import { Calendar, MessageCircle, Phone, Plus, Search } from 'lucide-react';
import { Badge } from '../components/ui/Badge.jsx';
import { Button } from '../components/ui/Button.jsx';
import { LEAD_TEMPERATURES } from '../constants';
import { useCRMData } from '../context/CRMDataContext.jsx';

export const Leads = () => {
  const { leads } = useCRMData();

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-sans text-lg font-bold">Leads Inbox</h2>
          <p className="text-xs text-ink-light">Capture Meta, WhatsApp, walk-in and referral inquiries.</p>
        </div>
        <Button className="min-h-8 px-3 text-xs"><Plus size={15} /> Add Lead</Button>
      </div>

      <div className="shell-card p-4">
        <div className="flex items-center gap-3 rounded-xl border border-paper-border bg-paper-soft px-3 py-2">
          <Search size={18} className="text-ink-extra" />
          <input className="w-full bg-transparent text-sm outline-none" placeholder="Search by customer, phone, product..." />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {leads.map((lead) => {
          const temp = LEAD_TEMPERATURES[lead.temperature] || LEAD_TEMPERATURES.GENERAL;
          return (
            <article key={lead.id} className="shell-card p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-float">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-sans text-sm font-bold">{lead.name}</h3>
                  <p className="font-mono text-xs text-ink-extra">{lead.phone}</p>
                </div>
                <Badge className={temp.badgeClass}>{temp.label}</Badge>
              </div>
              <p className="mt-4 text-sm text-ink-light">
                <span className="font-semibold text-ink">{lead.product}</span> x {lead.quantity} pcs
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                <Badge className="bg-brand-soft text-brand-dark">{lead.source}</Badge>
                <span className="ml-auto flex items-center gap-1 font-mono text-ink-extra"><Calendar size={12} />{lead.timeAgo}</span>
              </div>
              <p className="mt-3 rounded-xl bg-paper-soft px-3 py-2 text-sm text-ink-light">{lead.status} by {lead.assignee}</p>
              <div className="mt-4 grid grid-cols-2 gap-2 border-t border-paper-border pt-4">
                <Button variant="secondary" className="min-h-9 px-3"><MessageCircle size={15} /> WhatsApp</Button>
                <Button variant="secondary" className="min-h-9 px-3"><Phone size={15} /> Call</Button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
