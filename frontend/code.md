# PrintCRM: React & Tailwind Clean Code & Component Style Guide

This document defines the strict engineering guidelines, directory architectures, and code standards for building the **PrintCRM** SaaS application. Follow these rules to ensure the codebase remains maintainable, clean, and modular.

---

## 📂 1. Directory Structure & Architecture
Organize files logically to separate concerns. Each component, hook, or utility should have a single responsibility.

```
src/
├── constants/         # 📌 SECTION 2: Unified global constants (No hardcoded values)
│   └── index.js       
├── components/        # 🧩 SECTION 3: Reusable components
│   ├── ui/            # Small stateless components (Button, Input, Badge, GlassModal)
│   └── layout/        # Shell components (Sidebar, Topbar, AppShell)
├── context/           # 🔄 State management contexts
│   ├── CRMContext.jsx
│   └── NotificationContext.jsx
├── hooks/             # 🛠 Custom hooks (useLeads, useOrders, useWhatsApp)
├── pages/             # 🖥 Page components (Dashboard, Leads, Orders, Settings)
├── utils/             # ⚙️ Client drivers & helpers (fcm, whatsappGateway)
└── main.jsx
```

---

## 📌 2. Unified Global Constants (`src/constants/index.js`)
**Never hardcode strings, roles, stages, or configurations inside components.** Always maintain and reference them from a single, unified source.

```javascript
// src/constants/index.js

export const LEAD_TEMPERATURES = {
  COLD: { value: 'COLD', label: 'Cold', badgeClass: 'bg-blue-light text-blue' },
  WARM: { value: 'WARM', label: 'Warm', badgeClass: 'bg-amber-light text-amber' },
  HOT: { value: 'HOT', label: 'Hot', badgeClass: 'bg-accent-light text-accent' },
  GENERAL: { value: 'GENERAL', label: 'General', badgeClass: 'bg-paper-2 text-ink-light' }
};

export const ORDER_STAGES = {
  NEW: { id: 1, label: 'New / Confirmed', color: '#6a1ac4' },
  QUOTED: { id: 2, label: 'Quoted', color: '#1a4ac4' },
  PRODUCTION: { id: 3, label: 'In Production', color: '#c47a10' },
  QUALITY_CHECK: { id: 4, label: 'Quality Check', color: '#e8521a' },
  READY: { id: 5, label: 'Ready', color: '#1a7a4a' },
  DELIVERY: { id: 6, label: 'Out for Delivery', color: '#1a4ac4' },
  DELIVERED: { id: 7, label: 'Delivered', color: '#7a7874' }
};

export const ROLES = {
  OWNER: 'OWNER',
  MANAGER: 'MANAGER',
  SALES: 'SALES',
  PRODUCTION: 'PRODUCTION',
  DELIVERY: 'DELIVERY',
  ACCOUNTANT: 'ACCOUNTANT'
};

export const PAYMENT_METHODS = {
  UPI: 'UPI',
  CASH: 'Cash',
  BANK_TRANSFER: 'Bank Transfer',
  CHEQUE: 'Cheque'
};

export const SYSTEM_ALERTS = {
  GREEN: { value: 'safe', colorClass: 'bg-green-light text-green' },
  AMBER: { value: 'due_soon', colorClass: 'bg-amber-light text-amber' },
  RED: { value: 'overdue', colorClass: 'bg-red-light text-red animate-pulse' }
};
```

---

## 🧩 3. Component Design & Clean Code Rules

### Rule 1: Single Responsibility Principle (SRP)
*   **Keep components under 200 lines.** If a page or layout card gets larger, extract parts into separate files (e.g. break `LeadsPage.jsx` into `LeadsGrid.jsx`, `LeadCard.jsx`, and `LeadDetailModal.jsx`).

### Rule 2: Explicit & Typed Props
*   Always document and declare parameters clearly. Avoid generic or unstructured parameter dumps.
*   *Example:* Destructure props directly inside the component parameters instead of referencing `props.something`.

### Rule 3: Dynamic State Naming
*   Use clear, self-explanatory, boolean-prefixed state variables:
    *   *Correct:* `isModalOpen`, `isLoading`, `hasPendingBalance`.
    *   *Incorrect:* `modal`, `load`, `balance`.

### Rule 4: Decouple Logic from UI (Use Custom Hooks)
*   Do not fetch or parse complex data directly inside visual render components. Delegate API requests and calculations to hooks.
*   *Example:* Define `useCRM()` to fetch lists, rather than putting database handlers inside cards.

---

## 🧪 4. Clean Reference Component Implementation
Below is a high-fidelity reference implementation showcasing a clean, production-grade React component adhering to your Tailwind design guidelines and referencing our constants module.

```jsx
// src/components/ui/LeadCard.jsx
import React from 'react';
import { Mail, Phone, MessageCircle, Calendar } from 'lucide-react';
import { LEAD_TEMPERATURES } from '../../constants';

/**
 * LeadCard - Renders a single customer lead with clean spacing, custom styles, and metrics.
 */
export const LeadCard = ({ lead, onSelectCard, onOpenWhatsAppChat }) => {
  const { name, phone, product, quantity, temperature, source, timeAgo } = lead;
  
  // Fetch static styling rules from our global constants
  const tempConfig = LEAD_TEMPERATURES[temperature] || LEAD_TEMPERATURES.GENERAL;

  return (
    <div 
      onClick={() => onSelectCard(lead)}
      className="bg-white rounded-xl border border-paper-border p-5 cursor-pointer 
                 transition-all duration-200 ease-in-out hover:-translate-y-0.5 
                 hover:shadow-md hover:border-accent"
    >
      {/* Header Info */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-syne font-bold text-base text-ink">{name}</h4>
          <span className="font-mono text-xs text-ink-extra-light tracking-wide">{phone}</span>
        </div>
        <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-full ${tempConfig.badgeClass}`}>
          {tempConfig.label}
        </span>
      </div>

      {/* Product specs */}
      <p className="text-sm text-ink-light mb-4">
        <strong className="text-ink font-medium">{product}</strong> &times; {quantity} pcs
      </p>

      {/* Footer Info */}
      <div className="flex items-center gap-2 text-xs text-ink-extra-light mb-4 flex-wrap">
        <span className="bg-paper-card px-2 py-0.5 rounded text-ink-muted font-mono">{source}</span>
        <span className="flex items-center gap-1 font-mono ml-auto">
          <Calendar size={12} />
          {timeAgo}
        </span>
      </div>

      {/* Quick Action Panels */}
      <div className="flex gap-2 pt-3 border-t border-paper-border/60">
        <button 
          onClick={(e) => { e.stopPropagation(); onOpenWhatsAppChat(phone); }}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 
                     bg-paper-card text-ink-light rounded-lg text-xs font-medium 
                     transition-colors duration-150 hover:bg-accent-light hover:text-accent"
        >
          <MessageCircle size={14} className="text-green" />
          WhatsApp
        </button>
        <button 
          onClick={(e) => e.stopPropagation()} 
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 
                     bg-paper-card text-ink-light rounded-lg text-xs font-medium 
                     transition-colors duration-150 hover:bg-accent-light hover:text-accent"
        >
          <Phone size={14} />
          Call
        </button>
      </div>
    </div>
  );
};
```

---

## 🎨 5. Tailwind Styling Clean Code Guidelines

1.  **Prefer Semantics over Ad-hoc Values:**
    *   *Correct:* `bg-paper border-paper-border text-ink-light font-syne font-bold`
    *   *Incorrect:* `bg-[#faf8f4] border-[#e8521a] text-[#7a7874] font-bold`
2.  **Grid/Flex Containers:** Always support mobile responsive transitions first.
    *   *Desktop Grid:* `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4`
3.  **Active Button Hover States:**
    *   *Secondary Action:* `transition-colors duration-150 hover:bg-accent-light hover:text-accent hover:border-accent`
