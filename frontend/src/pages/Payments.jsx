import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../components/ui/Button.jsx';
import { useCRMData } from '../context/CRMDataContext.jsx';
import { formatCurrency, formatShortDate } from '../utils/formatters';

export const Payments = () => {
  const { payments, metrics } = useCRMData();

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-sans text-lg font-bold">Payments Ledger</h2>
          <p className="text-xs text-ink-light">Track collected revenue, partial payments and outstanding balances.</p>
        </div>
        <Button className="min-h-8 px-3 text-xs"><Plus size={15} /> Record Payment</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="shell-card p-5">
          <p className="text-sm font-semibold text-ink-light">Collected</p>
          <p className="mt-1 font-mono text-3xl font-bold text-system-green">{formatCurrency(metrics.revenue)}</p>
        </div>
        <div className="shell-card p-5">
          <p className="text-sm font-semibold text-ink-light">Outstanding</p>
          <p className="mt-1 font-mono text-3xl font-bold text-accent">{formatCurrency(metrics.outstanding)}</p>
        </div>
      </div>
      <div className="shell-card overflow-hidden">
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead className="bg-paper-soft text-xs uppercase tracking-wide text-ink-extra">
            <tr>
              <th className="px-5 py-4">Txn</th>
              <th className="px-5 py-4">Customer</th>
              <th className="px-5 py-4">Method</th>
              <th className="px-5 py-4">Date</th>
              <th className="px-5 py-4 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id} className="border-t border-paper-border">
                <td className="px-5 py-4 font-mono text-xs">{payment.id}</td>
                <td className="px-5 py-4 font-bold">{payment.customer}</td>
                <td className="px-5 py-4">{payment.method}</td>
                <td className="px-5 py-4">{formatShortDate(payment.date)}</td>
                <td className="px-5 py-4 text-right font-mono font-bold">{formatCurrency(payment.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
