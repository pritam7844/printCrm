import React from 'react';
import { CheckCircle2, Shield } from 'lucide-react';
import { Badge } from '../components/ui/Badge.jsx';
import { useCRMData } from '../context/CRMDataContext.jsx';
import { formatCurrency } from '../utils/formatters';

export const Team = () => {
  const { team } = useCRMData();

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-sans text-lg font-bold">Team & Permissions</h2>
        <p className="text-xs text-ink-light">Monitor role access, activity and overrides.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {team.map((member) => (
          <article key={member.name} className="shell-card p-5">
            <div className="flex items-start justify-between">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-brand text-lg font-bold text-white">
                {member.name.charAt(0)}
              </div>
              <Badge className={member.status === 'Online' ? 'bg-system-greenLight text-system-green' : 'bg-system-amberLight text-system-amber'}>
                {member.status}
              </Badge>
            </div>
            <h3 className="mt-4 font-sans text-sm font-bold text-ink">{member.name}</h3>
            <p className="text-sm text-ink-light">{member.role}</p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl bg-paper-soft p-3">
                <p className="text-ink-extra">Revenue</p>
                <p className="font-mono font-bold">{formatCurrency(member.revenue)}</p>
              </div>
              <div className="rounded-xl bg-paper-soft p-3">
                <p className="text-ink-extra">Closed</p>
                <p className="font-mono font-bold">{member.closed}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-brand-dark">
              <Shield size={16} />
              Default role permissions
              <CheckCircle2 size={16} className="ml-auto text-system-green" />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
