# PrintCRM React & Tailwind Complete SaaS Conversion Instruction Prompt

Use the following complete, highly detailed conversion prompt with your React code generator or LLM to build a beautiful, production-ready, resellable SaaS PrintCRM application.

---

```markdown
You are a Principal Frontend Architect and Product Engineer. Convert the comprehensive PrintCRM specifications and prototype code into a premium, SaaS-ready React application built with Tailwind CSS, Lucide React icons, Firebase dynamic notifications, and a provider-agnostic WhatsApp integration system using pnpm.

---

### 🚀 TECHNOLOGY STACK
1. **Core Platform**: React (bootstrapped via Vite with JavaScript/TypeScript).
2. **Styling Framework**: Tailwind CSS (strict alignment with custom design tokens, modern aesthetic, clean card designs, glassmorphism overlays).
3. **Icons Library**: `lucide-react` (for premium high-end visual cues).
4. **Package Manager**: `pnpm`
5. **State Management**: React Context (`CRMDataContext`) to maintain reactive application states (adding leads, drag-and-drop kanban columns, recording ledger entries, team configurations, and dynamic integrations).

---

### 🎨 PREMIUM & CLEAN DESIGN SYSTEM (INK & PAPER THEME)
Strictly follow the premium, clean, high-end "Ink & Paper" editorial design guidelines to wow customers:

#### 1. Color Palette (Configure in `tailwind.config.js`):
- **Accent (Burnt Orange)**: `accent: "#e8521a"`, `accent-hover: "#f07240"`, `accent-light: "#fde8df"`
- **Ink (Neutral Charcoal Darks)**: `ink: "#0f0e0c"`, `ink-muted: "#2a2825"`, `ink-light: "#4a4844"`, `ink-extra-light: "#7a7874"`
- **Paper (Warm Off-White Lights)**: `paper: "#faf8f4"`, `paper-card: "#f2ede4"`, `paper-border: "#e8e0d0"`
- **System Indicator Colors**:
  - Green (Success/Paid): `#1a7a4a` | Light: `#d8f0e4`
  - Amber (Warning/Pending): `#c47a10` | Light: `#fef0d0`
  - Red (Danger/Overdue): `#c41a1a` | Light: `#fde4e4`
  - Purple (Refunds/Actions): `#6a1ac4` | Light: `#ede4fd`
  - Blue (Info/Cold): `#1a4ac4` | Light: `#e4ecfd`

#### 2. Typography Rules:
- **Brand/Headers**: `'Syne', sans-serif` (Bold, geometric weight).
- **Body & Forms**: `'DM Sans', sans-serif` (Clean, highly legible geometric sans).
- **Numbers/Values**: `'DM Mono', monospace` (For ledger amounts, percentages, deadlines, phone numbers, and transactional IDs).

#### 3. Micro-Animations:
- Active transitions on hover (`transition-all duration-200 ease-out`).
- Delicate backdrop-blurs for modal overlays (`backdrop-blur-sm bg-ink/60`).
- Card transformations on interactive boards (`hover:-translate-y-0.5 hover:shadow-md`).

---

### 🔐 FIREBASE CLOUD MESSAGING (FCM) INTEGRATION
Ensure your notification architecture is completely dynamic, secure, and utilizes environmental configurations.

1. **Environment Configuration File (`.env`)**:
   Provide setup bindings for Firebase initialization, preventing any raw api keys from leaking:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
   VITE_FIREBASE_PROJECT_ID=your_project_id_here
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
   VITE_FIREBASE_APP_ID=your_app_id_here
   VITE_FIREBASE_VAPID_KEY=your_vapid_key_here
   ```

2. **Integration Implementation**:
   - Create `src/utils/firebase.js` to initialize Firebase dynamically using `import.meta.env` keys.
   - Implement Firebase Cloud Messaging (FCM) to listen for background notification pushes via a service worker located at `public/firebase-messaging-sw.js`.
   - Setup a custom global `NotificationContext` that handles foreground push notifications, instantly rendering elegant in-app toast banners whenever an alert is received (e.g. "🚨 Order #1038 Overdue!", "🎯 New Hot Lead from WhatsApp!").

---

### 💬 WHITE-LABELED & PROVIDER-AGNOSTIC WHATSAPP ENGINE
The application must be architected as a resellable SaaS product. If a user sells or licenses this software to another print shop, the tenant must be able to configure **any** WhatsApp API service provider (e.g. Interakt, Wati, AiSensy, Twilio, or a Custom Gateway) without modifying the source code.

1. **Strategy Pattern Service Client (`src/utils/whatsappGateway.js`)**:
   - Design an abstract/unified gateway client (`WhatsAppService`).
   - The client reads credentials and API URLs dynamically from custom state configurations rather than hardcoded endpoints.
   - Implement universal driver handlers for template message delivery:
     ```javascript
     class WhatsAppService {
       static async sendTemplate(providerConfig, phone, templateName, variables) {
         // Maps templates dynamically based on provider settings (Interakt vs Wati vs AiSensy)
         // Performs custom POST queries using dynamic header authorizations
       }
     }
     ```

2. **Tenant WhatsApp Integration Dashboard**:
   Build an interactive integration page under `Settings` where any admin user can configure their gateway:
   - **Provider Selection**: Dropdown selecting the active service (`Interakt`, `Wati`, `AiSensy`, `Twilio`, or `Custom API Provider`).
   - **Connection Settings**: Form inputs for custom `API Base URL`, `Authorization Secret Token Key`, and optional custom payload mappings.
   - **Live Webhook Endpoint Generator**: Displays a unique URL (e.g., `https://api.printcrm.in/webhook/whatsapp/tenant-id`) that the tenant copy-pastes into Wati or Interakt to capture incoming WhatsApp lead webhooks automatically.
   - **Lead Parameter Mapping**: Interactive JSON mapper where tenants map incoming keys (e.g. mapping provider's `message.sender.name` directly to CRM Lead Name).
   - **Template Manager Simulator**: Allows mapping CRM event hooks (e.g., Lead Created, Payment Completed, Order Ready) to specific WhatsApp provider templates.

---

### 📂 CORE CRM MODULES & DYNAMIC FUNCTIONALITIES

#### 1. Dynamic Shell & Switcher
- Persistent role switcher dropdown in the Sidebar to seamlessly simulate role views (Owner, Manager, Sales Agent, Production, Delivery, Accountant).
- Route permissions dynamically hiding pages or rendering edit/read-only views according to the system permission matrix.

#### 2. Main Dashboard
- **SaaS Metric Cards**: Total Leads, Active Orders, Revenue Collected (Month), Overdue Count.
- Visual breakdown cards for Lead Temperature splits, Category product metrics, Collected vs Outstanding margins.
- Clean tables for recent items, overdue timelines, and a live reactive team activity feed.

#### 3. Lead Directory & Note Timelines
- Toggle between card grids and dense list tables.
- Filter panels to easily sort by acquisition source, temperature scales, or assignees.
- Master modal overlays allowing users to adjust assignee pools, append timestamped team notes, or trigger a clean transition converting the lead into an active order.

#### 4. Kanban Order Pipeline
- Beautiful 7-stage visual Kanban board pipeline.
- Cards clearly tracking deadlines (color-coded as Green, Amber, Red based on days left), total amounts, balance states, and item summaries.
- Dynamic drag-and-drop or select menus to progress orders between states.

#### 5. Payments & Ledger Logging
- Collected vs Outstanding balance graphs.
- Functional Transaction log ledger recording splits, UPI/Cash transaction reference IDs, dates, and accountant tracking.
- Button to easily "Record Payment" and dynamically deduct outstanding balances from client orders.

#### 6. Team Grid & Custom Permission Overrides
- Grid view of active members with status dots and performance stats (LTV generated, closed volumes).
- Custom Override panels: Interactive checkboxes allowing the Owner to dynamically override default permission sets for individual accounts.

---

### 🧱 MODULAR COMPONENT DIRECTORY
Create isolated, highly documented components:
- `src/components/ui/` for buttons, inputs, badge tags, glass modals, cards.
- `src/components/layout/` for Sidebar navigation, Topbar notifications.
- `src/context/` for state containers (`CRMDataContext`, `NotificationContext`).
- `src/pages/` for independent page modules.

Provide beautifully styled components, clean modular structures, fully comment your integrations, and ensure all inputs utilize environment variables as fallbacks. Include a comprehensive mock data configuration for interactive live previews.
```
