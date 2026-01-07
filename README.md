# Athithya - Premium Travel & Trekking UI

Athithya is the frontend interface for a specialized travel platform focused on Himalayan adventures. It provides a luxury, high-performance experience for discovering treks, connecting with local hosts, and managing unique travel itineraries.

---

## 🎨 Design Philosophy

The UI is built to feel premium, using a "Gold & Luxury" theme that mirrors the majesty of the Himalayas. 
- **High-Impact Visuals**: Large, immersive imagery and smooth transitions using Framer Motion.
- **Micro-Interactions**: Subtle animations for tabs, buttons, and state changes.
- **Performance**: Optimized asset loading and responsive layouts for all devices.

---

## 🚀 Tech Stack

- **React 18**: Core framework via Vite.
- **Tailwind CSS**: Utility-first styling with custom gold tokens.
- **Framer Motion**: Page transitions and complex scroll animations.
- **React Router**: SPAs routing with protected access control.
- **API Integration**: Axios-driven communication with the Athithya Backend.

---

## 📂 Architecture

### Component Hierarchy
- `/components/Static`: Layout persistent elements (Navbar, Footer).
- `/components/Home`: Interactive sections like Video Carousels and Parallax Scrolls.
- `/components/cards`: Modular data displays for treks, hosts, and reviews.
- `/components/auth`: Multi-step registration and login flows.

### Pages
- `Home`: The entry point featuring curated collections and featured highlights.
- `Explore`: A comprehensive search and discovery engine for all listings.
- `SinglePlace`: Immersive deep-dive into specific treks or services.
- `ProfileRouter`: Handles dynamic role-based profile views.
- `ChatPage`: Real-time communication interface for guests and hosts.

---

## 🛠️ Setup & Development

### Prerequisites
- Node.js v18+
- Backend API running (see [athithya README](../athithya/README.md))

### Quick Start
1. **Installation**
   ```bash
   npm install
   ```

2. **Environment**
   Create a `.env` in the root:
   ```env
   VITE_WEB_API=http://localhost:3000/api
   ```

3. **Development**
   ```bash
   npm run dev
   ```

---

## 🧹 Code Quality
- All UI logic resides in `/src`.
- Global state is managed via React Context (Authentication, User Session).
- Reusable hooks for common logic (API calls, scroll tracking).

---

**Crafted with 🏔️ in Uttarakhand.**
