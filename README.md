# TaskFlow - Task Management App

## 🚀 Overview
TaskFlow is a full-stack task management application built using React, Node.js, Express, and MongoDB. It allows users to create, manage, and track tasks efficiently.

---

## 🛠️ Tech Stack
- Frontend: React (Vite, Tailwind CSS)
- Backend: Node.js, Express
- Database: MongoDB

---

## ⚙️ Setup Instructions

### 1. Clone Repository
```bash
git clone <your-repo-link>
cd project
2. Backend Setup
cd backend
npm install

Create a .env file inside backend folder:

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret

Run backend:
npm run dev

3. Frontend Setup
cd frontend
npm install
npm run dev

🔌 API Endpoints
Auth
POST /api/auth/register → Register user
POST /api/auth/login → Login user
Tasks
GET /api/tasks → Get tasks (pagination, filtering, sorting)
POST /api/tasks → Create task
PUT /api/tasks/:id → Update task
DELETE /api/tasks/:id → Delete task
GET /api/tasks/analytics → Task analytics

🎨 Features
User Authentication (JWT)
Task CRUD operations
Filtering & Searching
Sorting (date, priority)
Pagination
Dashboard analytics
Dark mode
Responsive design

🧠 Design Decisions
Used JWT for secure authentication
MongoDB indexing for faster queries
REST API design for scalability
Tailwind CSS for fast UI development
Pagination implemented using limit & skip

📸 Screenshots

(Add screenshots here if needed)

✨ Future Improvements
Role-based access control
Improved mobile UI
Loading animations
🏁 Final Note

This project demonstrates a complete full-stack implementation with modern UI, efficient backend handling, and scalable design.


---

