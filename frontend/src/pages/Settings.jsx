import React from 'react';
import { Copy, PlugZap, Save } from 'lucide-react';
import { Button } from '../components/ui/Button.jsx';
import { PROVIDERS } from '../constants';
import { useCRMData } from '../context/CRMDataContext.jsx';

export const Settings = () => {
  const { providerConfig, setProviderConfig } = useCRMData();
  const updateConfig = (key, value) => setProviderConfig((current) => ({ ...current, [key]: value }));
  const updateFieldMap = (key, value) =>
    setProviderConfig((current) => ({ ...current, fieldMap: { ...current.fieldMap, [key]: value } }));

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-sans text-lg font-bold">WhatsApp & Integrations</h2>
        <p className="text-xs text-ink-light">Configure Interakt, Wati, AiSensy, Twilio or a custom HTTP gateway per tenant.</p>
      </div>
      <section className="rounded-2xl border border-brand-line bg-brand-soft p-5 md:flex md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand text-white"><PlugZap size={22} /></div>
          <div>
            <h3 className="font-sans text-sm font-bold">Connection Status</h3>
            <p className="text-sm text-ink-light">Provider configuration is stored dynamically and can be saved to MongoDB.</p>
          </div>
        </div>
        <Button className="mt-4 md:mt-0"><Save size={17} /> Save Provider</Button>
      </section>

      <section className="grid gap-5 xl:grid-cols-[1fr_0.9fr]">
        <div className="shell-card p-5">
          <h3 className="mb-4 font-sans text-sm font-bold">Gateway Settings</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-bold text-ink-light">Provider</span>
              <select
                value={providerConfig.provider}
                onChange={(event) => updateConfig('provider', event.target.value)}
                className="w-full rounded-xl border border-paper-border bg-white px-3 py-3 outline-none"
              >
                {PROVIDERS.map((provider) => <option key={provider}>{provider}</option>)}
              </select>
            </label>
            <label className="space-y-2">
              <span className="text-sm font-bold text-ink-light">Authorization Header</span>
              <input value={providerConfig.authHeader} onChange={(event) => updateConfig('authHeader', event.target.value)} className="w-full rounded-xl border border-paper-border px-3 py-3 outline-none" />
            </label>
            <label className="space-y-2 md:col-span-2">
              <span className="text-sm font-bold text-ink-light">API Base URL</span>
              <input value={providerConfig.baseUrl} onChange={(event) => updateConfig('baseUrl', event.target.value)} className="w-full rounded-xl border border-paper-border px-3 py-3 outline-none" />
            </label>
            <label className="space-y-2 md:col-span-2">
              <span className="text-sm font-bold text-ink-light">Secret Token</span>
              <input type="password" value={providerConfig.token} onChange={(event) => updateConfig('token', event.target.value)} className="w-full rounded-xl border border-paper-border px-3 py-3 outline-none" placeholder="Bearer token or API secret" />
            </label>
          </div>
        </div>
        <div className="shell-card p-5">
          <h3 className="mb-4 font-sans text-sm font-bold">Webhook Endpoint</h3>
          <div className="rounded-xl border border-paper-border bg-paper-soft p-4 font-mono text-sm text-ink-light">
            https://api.printcrm.in/webhook/whatsapp/tenant-demo
          </div>
          <Button variant="secondary" className="mt-3"><Copy size={16} /> Copy URL</Button>
          <h4 className="mb-3 mt-6 font-bold">Incoming Lead Mapping</h4>
          <div className="space-y-3">
            {Object.entries(providerConfig.fieldMap).map(([key, value]) => (
              <label key={key} className="grid gap-1">
                <span className="text-xs font-bold uppercase tracking-wide text-ink-extra">{key}</span>
                <input value={value} onChange={(event) => updateFieldMap(key, event.target.value)} className="rounded-xl border border-paper-border px-3 py-2 outline-none" />
              </label>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
