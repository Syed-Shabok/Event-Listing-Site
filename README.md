# 🎉 Event Listing Platform

<p align="left">
  <a href="https://syed-shabok.github.io/Event-Listing-Platform-Frontend/" target="_blank">
    <img src="https://img.shields.io/badge/🚀%20Live%20Demo-Click%20Here-success?style=for-the-badge" />
  </a>
</p>

---

## 📖 Project Overview
The **Event Listing Platform** is a robust full-stack web application designed for users in Bangladesh to discover, track, and manage local events. Whether it's a concert, workshop, or community gathering, this platform provides a seamless experience for finding what's happening nearby. It features a secure authentication system, real-time event tracking, and a highly responsive interface.

---

## 🛠 Main Technologies

### **Frontend**
- **React 19:** For building a modern, component-based user interface.
- **Zustand:** Lightweight and scalable state management.
- **TailwindCSS & DaisyUI:** For rapid, responsive, and beautiful UI design.
- **React Hook Form:** Efficient form handling and validation.

### **Backend**
- **Node.js & Express.js:** Scalable server-side logic and RESTful API architecture.
- **MongoDB & Mongoose:** NoSQL database for flexible event and user data storage.
- **JWT & Bcrypt:** Secure authentication and industry-standard password hashing.
- **Cloudinary:** Cloud-based storage for high-quality event image management.

---

## ✨ Main Features
- **Secure Authentication:** User registration and login with JWT stored in secure cookies.
- **Dynamic Event Discovery:** Browse events filtered by category, date, and location.
- **Personalized Tracking:** Users can "Track" or "Untrack" events to build a personal interest list.
- **Cloud Integration:** Seamless event image uploads via Cloudinary.
- **Responsive Design:** Optimized for a flawless experience on mobile, tablet, and desktop.
- **Pagination:** Smooth data fetching for large lists of events to ensure high performance.

---

## 📦 Project Dependencies

### **Frontend Dependencies**
`axios`, `react-router-dom`, `react-hook-form`, `react-hot-toast`, `zustand`, `lucide-react`, `clsx`, `tailwind-merge`

### **Backend Dependencies**
`dotenv`, `jsonwebtoken`, `bcryptjs`, `cloudinary`, `multer`, `cors`, `cookie-parser`, `mongoose`

---

## 🚀 Local Installation Guide

### 1. Clone the repository
```bash
git clone [https://github.com/Syed-Shabok/Event-Listing-Platform-Frontend.git](https://github.com/Syed-Shabok/Event-Listing-Platform-Frontend.git)
cd Event-Listing-Platform-Frontend
```

### 2. Setup Environment Variables

Create a `.env` file in the **backend** folder and add:

```jsx
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_KEY=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Install & Run Backend

```jsx
cd backend
npm install
npm run dev
```

### 4. Install & Run Frontend

```jsx
cd frontend
npm install
npm run dev
```

*The application will be available at `http://localhost:5173`.*
