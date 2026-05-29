import React from 'react';
import { ArrowUpRight, Clock, IndianRupee, MessageCircle, Package, TriangleAlert } from 'lucide-react';
import { Badge } from '../components/ui/Badge.jsx';
import { Button } from '../components/ui/Button.jsx';
import { LEAD_TEMPERATURES } from '../constants';
import { useCRMData } from '../context/CRMDataContext.jsx';
import { useNotifications } from '../context/NotificationContext.jsx';
import { formatCurrency, getDeadlineStatus } from '../utils/formatters';

const MetricCard = ({ title, value, icon: Icon, tone }) => (
  <div className="shell-card p-3.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-float cursor-pointer hover:border-brand-line/60">
    <div className="flex items-center justify-between">
      <div className={`grid h-8 w-8 place-items-center rounded-lg ${tone}`}>
        <Icon size={16} />
      </div>
      <ArrowUpRight size={14} className="text-ink-extra" />
    </div>
    <p className="mt-3 text-xs font-semibold text-ink-light">{title}</p>
    <p className="mt-0.5 font-mono text-lg font-bold text-ink">{value}</p>
  </div>
);

export const Dashboard = () => {
  const { metrics, leads, orders } = useCRMData();
  const { pushToast } = useNotifications();

  return (
    <div className="space-y-4">
      <section className="rounded-xl border border-brand-line bg-brand-soft p-3.5 md:flex md:items-center md:justify-between">
        <div>
          <h2 className="font-sans text-base font-bold text-ink">Print shop command center</h2>
          <p className="mt-0.5 text-xs text-ink-light">
            Track WhatsApp leads, print production stages, payment balances and team activity from one operational dashboard.
          </p>
        </div>
        <Button className="mt-3 min-h-8 px-3 py-1 text-xs md:mt-0" onClick={() => pushToast({ title: 'Demo alert sent', body: 'Order ORD-2207 is overdue for quality check.' })}>
          Send Test Alert
        </Button>
      </section>

      <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard title="Total Leads" value={metrics.totalLeads} icon={MessageCircle} tone="bg-system-blueLight text-system-blue" />
        <MetricCard title="Active Orders" value={metrics.activeOrders} icon={Package} tone="bg-system-purpleLight text-system-purple" />
        <MetricCard title="Revenue Collected" value={formatCurrency(metrics.revenue)} icon={IndianRupee} tone="bg-system-greenLight text-system-green" />
        <MetricCard title="Overdue Orders" value={metrics.overdue} icon={TriangleAlert} tone="bg-system-redLight text-system-red" />
      </section>

      {/* Analytics & Graphs Section */}
      <section className="grid gap-4 md:grid-cols-2">
        {/* Sales Performance SVG Bar Chart */}
        <div className="shell-card p-4">
          <div className="mb-2.5 flex items-center justify-between">
            <h3 className="font-sans text-sm font-bold text-ink">Sales Performance</h3>
            <span className="text-[10px] font-mono text-ink-extra">Revenue Trend (₹)</span>
          </div>
          <div className="relative h-[130px] w-full">
            <svg viewBox="0 0 400 130" className="h-full w-full overflow-visible">
              {/* Horizontal grid lines */}
              <line x1="40" y1="15" x2="380" y2="15" stroke="#cfe4db" strokeWidth="0.5" strokeDasharray="3 3" />
              <line x1="40" y1="50" x2="380" y2="50" stroke="#cfe4db" strokeWidth="0.5" strokeDasharray="3 3" />
              <line x1="40" y1="85" x2="380" y2="85" stroke="#cfe4db" strokeWidth="0.5" strokeDasharray="3 3" />
              <line x1="40" y1="115" x2="380" y2="115" stroke="#d9e2df" strokeWidth="1" />

              {/* Y Axis Labels */}
              <text x="32" y="18" className="fill-ink-extra font-mono text-[9px]" textAnchor="end">1.5L</text>
              <text x="32" y="53" className="fill-ink-extra font-mono text-[9px]" textAnchor="end">1.0L</text>
              <text x="32" y="88" className="fill-ink-extra font-mono text-[9px]" textAnchor="end">50K</text>
              <text x="32" y="118" className="fill-ink-extra font-mono text-[9px]" textAnchor="end">0</text>

              {/* Bars */}
              {/* Dec: 45K (height 30px, y = 115 - 30 = 85) */}
              <rect x="70" y="85" width="24" height="30" rx="3" className="fill-brand/75 transition-all duration-200 hover:fill-accent cursor-pointer" />
              {/* Jan: 62K (height 42px, y = 115 - 42 = 73) */}
              <rect x="120" y="73" width="24" height="42" rx="3" className="fill-brand/75 transition-all duration-200 hover:fill-accent cursor-pointer" />
              {/* Feb: 88K (height 60px, y = 115 - 60 = 55) */}
              <rect x="170" y="55" width="24" height="60" rx="3" className="fill-brand/75 transition-all duration-200 hover:fill-accent cursor-pointer" />
              {/* Mar: 1.1L (height 75px, y = 115 - 75 = 40) */}
              <rect x="220" y="40" width="24" height="75" rx="3" className="fill-brand/75 transition-all duration-200 hover:fill-accent cursor-pointer" />
              {/* Apr: 95K (height 65px, y = 115 - 65 = 50) */}
              <rect x="270" y="50" width="24" height="65" rx="3" className="fill-brand/75 transition-all duration-200 hover:fill-accent cursor-pointer" />
              {/* May: 1.4L (height 96px, y = 115 - 96 = 19) */}
              <rect x="320" y="19" width="24" height="96" rx="3" className="fill-brand transition-all duration-200 hover:fill-accent cursor-pointer" />

              {/* X Axis Labels */}
              <text x="82" y="128" className="fill-ink-extra font-mono text-[9px]" textAnchor="middle">Dec</text>
              <text x="132" y="128" className="fill-ink-extra font-mono text-[9px]" textAnchor="middle">Jan</text>
              <text x="182" y="128" className="fill-ink-extra font-mono text-[9px]" textAnchor="middle">Feb</text>
              <text x="232" y="128" className="fill-ink-extra font-mono text-[9px]" textAnchor="middle">Mar</text>
              <text x="282" y="128" className="fill-ink-extra font-mono text-[9px]" textAnchor="middle">Apr</text>
              <text x="332" y="128" className="fill-ink font-mono text-[9px] font-bold" textAnchor="middle">May</text>
            </svg>
          </div>
        </div>

        {/* Product Sales Distribution Progress Chart */}
        <div className="shell-card p-4">
          <div className="mb-2.5 flex items-center justify-between">
            <h3 className="font-sans text-sm font-bold text-ink">Product Breakdown</h3>
            <span className="text-[10px] font-mono text-ink-extra">Monthly Volume</span>
          </div>
          <div className="space-y-2 pt-0.5">
            {/* Visiting Cards */}
            <div className="space-y-0.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-medium text-ink">Visiting Cards</span>
                <span className="font-mono text-ink-light">48% (₹22K LTV)</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-paper-soft overflow-hidden">
                <div className="h-1.5 rounded-full bg-brand animate-fill-width" style={{ width: '48%' }} />
              </div>
            </div>
            {/* Banners */}
            <div className="space-y-0.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-medium text-ink">Flex Banners</span>
                <span className="font-mono text-ink-light">28% (₹48K LTV)</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-paper-soft overflow-hidden">
                <div className="h-1.5 rounded-full bg-accent animate-fill-width" style={{ width: '28%' }} />
              </div>
            </div>
            {/* Cups / Mugs */}
            <div className="space-y-0.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-medium text-ink">Printed Cups/Mugs</span>
                <span className="font-mono text-ink-light">18% (₹36.5K LTV)</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-paper-soft overflow-hidden">
                <div className="h-1.5 rounded-full bg-system-purple animate-fill-width" style={{ width: '18%' }} />
              </div>
            </div>
            {/* Stickers */}
            <div className="space-y-0.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-medium text-ink">Custom Stickers</span>
                <span className="font-mono text-ink-light">6% (₹18.2K LTV)</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-paper-soft overflow-hidden">
                <div className="h-1.5 rounded-full bg-system-amber animate-fill-width" style={{ width: '6%' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1fr_1.1fr]">
        <div className="shell-card p-4">
          <div className="mb-2.5 flex items-center justify-between">
            <h3 className="font-sans text-sm font-bold">Lead Temperature</h3>
            <Badge className="bg-brand-soft text-brand-dark">Live</Badge>
          </div>
          <div className="space-y-2">
            {Object.values(LEAD_TEMPERATURES).map((temp) => {
              const count = leads.filter((lead) => lead.temperature === temp.value).length;
              return (
                <div key={temp.value} className="flex items-center justify-between rounded-lg border border-paper-border px-3 py-2 text-xs">
                  <Badge className={temp.badgeClass}>{temp.label}</Badge>
                  <span className="font-mono font-bold text-ink">{count} leads</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="shell-card p-4">
          <h3 className="mb-2.5 font-sans text-sm font-bold">Priority Orders</h3>
          <div className="space-y-2">
            {orders.slice(0, 4).map((order) => {
              const status = getDeadlineStatus(order.deadline);
              return (
                <div key={order.id} className="grid gap-2 rounded-lg border border-paper-border px-3 py-2.5 text-xs md:grid-cols-[1fr_auto]">
                  <div>
                    <p className="font-semibold text-ink">{order.customer}</p>
                    <p className="text-[11px] text-ink-light">{order.product} x {order.quantity}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={13} className="text-ink-extra" />
                    <Badge className={status.colorClass}>{status.label}</Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
