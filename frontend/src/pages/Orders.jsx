import React, { useState } from 'react';
import { IndianRupee, MoveRight } from 'lucide-react';
import { Badge } from '../components/ui/Badge.jsx';
import { useCRMData } from '../context/CRMDataContext.jsx';
import { formatCurrency, getDeadlineStatus } from '../utils/formatters';

export const Orders = () => {
  const { orders, stages, moveOrder } = useCRMData();
  const [activeHoverStageId, setActiveHoverStageId] = useState(null);

  const handleDragStart = (event, orderId) => {
    event.dataTransfer.setData('text/plain', orderId);
  };

  const handleDrop = (event, stageId) => {
    event.preventDefault();
    setActiveHoverStageId(null);
    const orderId = event.dataTransfer.getData('text/plain');
    if (orderId) {
      moveOrder(orderId, stageId);
    }
  };

  const handleDragOver = (event, stageId) => {
    event.preventDefault();
    if (activeHoverStageId !== stageId) {
      setActiveHoverStageId(stageId);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="font-sans text-lg font-bold text-ink">Order Pipeline</h2>
        <p className="text-xs text-ink-light">Drag and drop cards or use the dropdown selectors to move print jobs.</p>
      </div>
      <div 
        className="flex gap-3 overflow-x-auto pb-4 items-start"
        onDragLeave={() => setActiveHoverStageId(null)}
      >
        {stages.map((stage) => {
          const isHovered = activeHoverStageId === stage.id;
          const stageOrders = orders.filter((order) => order.stage === stage.id);
          
          return (
            <section 
              key={stage.id} 
              onDragOver={(event) => handleDragOver(event, stage.id)}
              onDrop={(event) => handleDrop(event, stage.id)}
              className={`w-[230px] shrink-0 rounded-lg border p-2 transition-all duration-200 ${
                isHovered 
                  ? 'border-brand/40 bg-brand-soft/20 shadow-sm scale-[1.01]' 
                  : 'border-paper-border bg-paper-soft hover:bg-paper-border/30'
              }`}
            >
              <div className="mb-2 flex items-center justify-between px-1">
                <h3 className="text-xs font-bold text-ink">{stage.label}</h3>
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: stage.color }} />
              </div>
              <div className="space-y-2 min-h-[320px] flex flex-col">
                {stageOrders.map((order) => {
                  const status = getDeadlineStatus(order.deadline);
                  const balance = order.total - order.paid;
                  return (
                    <article 
                      key={order.id} 
                      draggable
                      onDragStart={(event) => handleDragStart(event, order.id)}
                      onDragEnd={() => setActiveHoverStageId(null)}
                      className="rounded-lg border border-paper-border bg-white p-3 shadow-card transition-all duration-200 hover:shadow-float cursor-grab active:cursor-grabbing hover:border-brand/40 hover:scale-[1.02] hover:-translate-y-0.5 active:scale-95 animate-fade-in"
                    >
                      <div className="flex items-start justify-between gap-1.5">
                        <div>
                          <p className="text-xs font-bold text-ink truncate max-w-[120px]">{order.customer}</p>
                          <p className="font-mono text-[10px] text-ink-extra">{order.id}</p>
                        </div>
                        <Badge className={`${status.colorClass} px-1.5 py-0.5 text-[9px]`}>
                          {status.days < 0 ? `${Math.abs(status.days)}d late` : `${status.days}d`}
                        </Badge>
                      </div>
                      <p className="mt-2 text-xs text-ink-light truncate">{order.product} x {order.quantity}</p>
                      <div className="mt-2 rounded-md bg-paper-soft p-2 text-[11px] leading-tight">
                        <div className="flex items-center justify-between text-ink-light">
                          <span className="flex items-center gap-0.5"><IndianRupee size={10} />Total</span>
                          <span className="font-mono font-bold text-ink">{formatCurrency(order.total)}</span>
                        </div>
                        <div className="mt-1 flex items-center justify-between">
                          <span className="text-ink-light">Balance</span>
                          <span className="font-mono font-bold text-accent">{formatCurrency(balance)}</span>
                        </div>
                      </div>
                      <select
                        value={order.stage}
                        onChange={(event) => moveOrder(order.id, event.target.value)}
                        className="mt-2 w-full rounded-md border border-paper-border bg-white px-2 py-1 text-xs font-semibold text-ink-light outline-none"
                      >
                        {stages.map((option) => (
                          <option key={option.id} value={option.id}>{option.label}</option>
                        ))}
                      </select>
                    </article>
                  );
                })}

                {stageOrders.length === 0 && !isHovered && (
                  <div className="rounded-lg border border-dashed border-paper-border p-3 text-center text-xs text-ink-extra my-auto">
                    No jobs here <MoveRight size={14} className="mx-auto mt-1.5" />
                  </div>
                )}

                {isHovered && (
                  <div className="rounded-lg border-2 border-dashed border-brand/30 bg-brand-soft/10 p-4 text-center text-xs text-brand-dark/70 font-semibold animate-pulse-border mt-auto flex-1 flex items-center justify-center min-h-[60px]">
                    Drop here
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};
