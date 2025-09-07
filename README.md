# 🚀 HWeb - Website Development Service Platform

HWeb is a **modern website development service platform** that allows customers to order professional websites with quick turnaround times (as fast as 24 hours).  
The platform features:
- A **customer-facing landing page** (services, portfolio, testimonials, FAQ, CTA)  
- An **admin dashboard** for content management  

Built with **React, TypeScript, Express, and Firebase** for real-time data handling.

🌐 **Live Website** → [https://frhndevweb.biz.id](https://frhndevweb.biz.id)

---

## ⚡ User Preferences
- Preferred communication style → Simple, everyday language

---

## 🏗️ System Architecture

<details>
<summary>🎨 Frontend Architecture</summary>

- **Framework**: React 18 + TypeScript + Vite  
- **Styling**: Tailwind CSS + shadcn/ui  
- **Routing**: Wouter (lightweight client routing)  
- **State Management**: TanStack Query  
- **Forms**: React Hook Form + Zod validation  

</details>

<details>
<summary>⚙️ Backend Architecture</summary>

- **Server**: Express.js (TypeScript)  
- **Dev**: Hot module replacement via Vite  
- **Storage**: In-memory (MemStorage) for dev/testing  
- **Middleware**: Logging, JSON parsing, error handling  

</details>

<details>
<summary>🗄️ Data Storage Solutions</summary>

- **Database**: Firebase Realtime Database  
- **Schema**: Zod for runtime validation  
- **Local Storage**: In-memory dev/testing  

</details>

<details>
<summary>🔐 Authentication & Authorization</summary>

- **Admin Auth**: Firebase Auth (email/password)  
- **Session**: Firebase session handling  
- **Route Protection**: Protected admin routes  

</details>

<details>
<summary>📦 Component Architecture</summary>

- **Landing Page**: Hero, Features, Services, Portfolio, Testimonials, FAQ, CTA, Footer  
- **Admin Dashboard**: CRUD for all content  
- **UI Components**: Reusable with shadcn/ui  
- **Real-time Updates**: Firebase listeners  

</details>

<details>
<summary>🎨 Design System</summary>

- **Typography**: Inter font  
- **Color Scheme**: Blue (primary), Yellow (accent)  
- **Responsive**: Mobile-first with Tailwind  
- **Animations**: CSS transitions & hover effects  

</details>

---

## 📦 External Dependencies

<details>
<summary>🛠️ Third-Party Services</summary>

- **Firebase**: Auth + Realtime DB  
- **WhatsApp**: Direct links for customer chat  
- **Unsplash**: Stock images  

</details>

<details>
<summary>📚 Key Libraries</summary>

- **UI**: React 18 + TypeScript  
- **Build Tool**: Vite  
- **Components**: Radix UI primitives via shadcn/ui  
- **Validation**: Zod  
- **Styling**: Tailwind CSS + PostCSS  
- **Dates**: date-fns  

</details>

<details>
<summary>🧑‍💻 Development Tools</summary>

- **ORM**: Drizzle ORM (PostgreSQL-ready)  
- **Type Safety**: Strict TypeScript  
- **Code Quality**: ESLint + Prettier  
- **Error Handling**: Runtime overlay  

</details>

<details>
<summary>🚀 Deployment Considerations</summary>

- **Static Assets**: Vite build = optimized output  
- **Env Variables**: Firebase config via `.env`  
- **Database Migration**: Drizzle setup for PostgreSQL  
- **Sessions**: connect-pg-simple for production  

</details>