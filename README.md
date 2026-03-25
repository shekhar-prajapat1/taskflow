# TaskFlow - Task Management App
## 🌐 Live Project

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge)](https://taskflow-uu1u.vercel.app)

[![Backend API](https://img.shields.io/badge/API-Server-green?style=for-the-badge)](https://taskflow-backend-jmmz.onrender.com)

Link: https://taskflow-uu1u.vercel.app/

## 🚀 Overview
TaskFlow is a full-stack task management application built using **React, Node.js, Express, and MongoDB**. It allows users to create, manage, and track tasks efficiently.

---

## 🛠️ Tech Stack
- **Frontend:** React (Vite, Tailwind CSS)  
- **Backend:** Node.js, Express  
- **Database:** MongoDB  

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository
```bash
git clone https://github.com/shekhar-prajapat1/taskflow.git
cd taskflow

2️⃣ Backend Setup
cd backend
npm install
```
🔐 Create .env file inside backend:
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret

Run backend:
npm run dev
```
3️⃣ Frontend Setup
cd frontend
npm install
npm run dev
```
```
🔌 API Endpoints
🔐 Auth
POST /api/auth/register → Register user
POST /api/auth/login → Login user
```
```
📋 Tasks
GET /api/tasks → Get tasks (pagination, filtering, sorting)
POST /api/tasks → Create task
PUT /api/tasks/:id → Update task
DELETE /api/tasks/:id → Delete task
GET /api/tasks/analytics → Task analytics
```
```
🎨 Features
✅ User Authentication (JWT)
✅ Task CRUD operations
✅ Filtering & Searching
✅ Sorting (date, priority)
✅ Pagination
✅ Dashboard analytics
✅ Dark mode
✅ Responsive design
```
```
🎨 Features
✅ User Authentication (JWT)
✅ Task CRUD operations
✅ Filtering & Searching
✅ Sorting (date, priority)
✅ Pagination
✅ Dashboard analytics
✅ Dark mode
✅ Responsive design
```
```
✨ Future Improvements
Role-based access control
```
```
🏁 Final Note
This project demonstrates a complete full-stack implementation with modern UI, efficient backend handling, and scalable design.
```
SHEKHAR PRAJAPAT NIT WARANGAL CSE 2026
