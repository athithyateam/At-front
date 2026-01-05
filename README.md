# 🏔️ Athithya - Premium Travel & Trekking Platform

**Athithya** is a modern, full-stack travel platform designed to connect travelers (Guests) with local adventure providers (Hosts). It facilitates unique trekking experiences, services, and cultural stays in the Himalayas.

This project is structured as a **Full Stack Application** split into two repositories/directories:
1.  **`At-front`**: The Frontend Application (React + Vite).
2.  **`athithya`**: The Backend API (Node.js + Express).

---

## 🚀 Tech Stack

### **Frontend (`At-front`)**
-   **Framework:** React 18 (via Vite)
-   **Styling:** Tailwind CSS (v4) + Vanilla CSS Variables (Gold/Luxury Theme)
-   **Animations:** Framer Motion (Page transitions, micro-interactions)
-   **State Management:** Context API (Auth, Notifications)
-   **Routing:** React Router DOM (v6+)
-   **Icons:** React Icons (Material Design, FontAwesome)
-   **HTTP Client:** Axios

### **Backend (`athithya`)**
-   **Runtime:** Node.js
-   **Framework:** Express.js
-   **Database:** MongoDB (with Geospatial Indexing)
-   **ORM:** Mongoose
-   **Authentication:** JWT, bcrypt, OTP (Email-based)
-   **Validation:** Zod
-   **Media:** Cloudinary Integration (Images/Videos)

### **Deployment**
-   **Platform:** Vercel
-   **Strategy:** Dual-deployment (Frontend serves UI, Backend serves API).

---

## 🌟 Key Features

### **👥 User Roles**

#### **1. Guest (Traveler)**
-   **Explore:** Discover top-rated treks, nearby adventures, and featured hosts.
-   **Search:** Geospatial search to find treks near their current location.
-   **Connect:** Follow hosts and interact with the community.
-   **Profile:** Manage personal travel profile.
-   **Safety:** Access safety guidelines and support resources.

#### **2. Host (Provider)**
-   **Create Listings:** Post Treks, Services, and unique Experiences.
-   **Manage Business:** Dashboard to track listings and reviews.
-   **Profile:** Enhanced profile with "Host" badge and reputation stats.
-   **Verification:** Verified status (Gold badge) for trusted hosts.

---

## 📂 Project Structure

### **1. Frontend (`/src`)**
-   **`components/`**: Reusable UI components (Navbar, Cards, Modals).
-   **`pages/`**: Main Application Pages.
    -   `Home`: Hero section, Categories, Featured.
    -   `Explore`: Browse all treks/services.
    -   `PostForm`: Interface for Hosts to create new listings.
    -   `SinglePlace`: Detailed view of a trek/service.
    -   `ProfileRouter`: Dynamic user profiles (Host vs. Guest view).
-   **`context/`**: Global state (User Auth, Real-time Notifications).
-   **`api/`**: Centralized API calls (Axios instances).

### **2. Backend (`/api`)**
-   **`auth`**: Signup, Signin, OTP Verification, Password Reset.
-   **`posts`**: CRUD for Treks, Experiences, and Services.
-   **`users`**: Profile management, Top-rated Hosts.
-   **`reviews`**: Review and Rating system.
-   **`nearby`**: Geo-location based search logic.

---

## 🛠️ Setup & Installation

### **Prerequisites**
-   Node.js (v18+)
-   MongoDB (Local or Atlas)

### **1. Backend Setup**
Navigate to the `athithya` directory:
```bash
cd athithya
npm install
# Create .env file with MONGO_URL, JWT_SECRET, PORT=3000
npm start
```

### **2. Frontend Setup**
Navigate to the `At-front` directory:
```bash
cd At-front
npm install
# Ensure .env points to backend: VITE_WEB_API=http://localhost:3000
npm run dev
```

---

## 🧹 Database & Clean Code
The project follows a clean architecture. All database-related logic, schemas, and queries are encapsulated within the **Backend** (`athithya/models` & `athithya/controllers`).

Legacy setup scripts and temporary data files have been cleaned up to maintain repository hygiene.

---

**Developed for the love of Mountains & Hospitality.** 🏔️
