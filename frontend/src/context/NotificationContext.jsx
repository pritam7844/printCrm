import React, { createContext, useContext, useMemo, useState } from 'react';
import { Bell, X } from 'lucide-react';

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const [toasts, setToasts] = useState([
    { id: 'seed', title: 'New WhatsApp lead', body: 'Reena Sharma asked for 250 custom mugs.' }
  ]);

  const pushToast = (toast) => {
    setToasts((currentToasts) => [{ id: crypto.randomUUID(), ...toast }, ...currentToasts].slice(0, 4));
  };

  const dismissToast = (id) => {
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
  };

  const value = useMemo(() => ({ toasts, pushToast, dismissToast }), [toasts]);

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <div className="fixed right-5 top-20 z-50 grid w-[min(360px,calc(100vw-2rem))] gap-3">
        {toasts.map((toast) => (
          <div key={toast.id} className="rounded-2xl border border-brand-line bg-white p-4 shadow-float">
            <div className="flex items-start gap-3">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand-dark">
                <Bell size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-ink">{toast.title}</p>
                <p className="mt-1 text-sm text-ink-light">{toast.body}</p>
              </div>
              <button className="text-ink-extra hover:text-ink" onClick={() => dismissToast(toast.id)} aria-label="Dismiss">
                <X size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotifications must be used inside NotificationProvider');
  return context;
};
