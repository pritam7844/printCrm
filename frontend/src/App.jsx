import React, { useState } from 'react';
import { CRMDataProvider } from './context/CRMDataContext.jsx';
import { NotificationProvider } from './context/NotificationContext.jsx';
import { AppShell } from './components/layout/AppShell.jsx';
import { Dashboard } from './pages/Dashboard.jsx';
import { Leads } from './pages/Leads.jsx';
import { Orders } from './pages/Orders.jsx';
import { Payments } from './pages/Payments.jsx';
import { Team } from './pages/Team.jsx';
import { Settings } from './pages/Settings.jsx';

const pages = {
  dashboard: Dashboard,
  leads: Leads,
  orders: Orders,
  payments: Payments,
  team: Team,
  settings: Settings
};

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const ActivePage = pages[activePage];

  return (
    <CRMDataProvider>
      <NotificationProvider>
        <AppShell activePage={activePage} onChangePage={setActivePage}>
          <div key={activePage} className="animate-fade-in-up">
            <ActivePage />
          </div>
        </AppShell>
      </NotificationProvider>
    </CRMDataProvider>
  );
}
