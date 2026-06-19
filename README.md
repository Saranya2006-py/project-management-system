# 🚀 Gamified Project Management System

A modern Project Management System built with Next.js, Prisma, PostgreSQL, JWT Authentication, and Tailwind CSS.

This application allows users to manage projects, tasks, dashboards, and audit logs through a gamified and interactive interface.

---

## 📌 Features

### 🔐 Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Logout Functionality

### 📁 Project Management
- Create Project
- View Projects
- Update Project
- Delete Project
- Project Status Tracking

### ✅ Task Management
- Create Tasks
- Assign Tasks to Projects
- Update Tasks
- Delete Tasks
- Task Priority Management
- Due Date Tracking

### 📊 Dashboard
- Total Projects
- Total Tasks
- Completed Tasks
- Pending Tasks
- Overdue Tasks
- Interactive Charts

### 📜 Audit Logs
- Track User Actions
- Project Creation Logs
- Task Creation Logs
- Activity History

### 🎮 Gamified UI
- Glassmorphism Design
- Animated Background Effects
- Modern Dashboard
- Responsive Design

---

## 🛠 Tech Stack

### Frontend
- Next.js 16
- React
- TypeScript
- Tailwind CSS
- Recharts

### Backend
- Next.js API Routes
- Prisma ORM
- PostgreSQL

### Authentication
- JWT
- bcryptjs

### Validation
- Zod

---

## 📂 Project Structure

```bash
app/
 ├── dashboard
 ├── login
 ├── register
 ├── projects
 ├── tasks
 ├── audit-logs
 └── api

components/
 ├── Navbar.tsx
 └── GameBackground.tsx

lib/
 ├── prisma.ts
 ├── auth.ts
 ├── audit.ts

prisma/
 └── schema.prisma
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone <repository-url>
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create:

```env
.env
```

Add:

```env
DATABASE_URL=
JWT_SECRET=
```

### Run Prisma

```bash
npx prisma generate
npx prisma db push
```

### Start Development Server

```bash
npm run dev
```

Open:

```bash
http://localhost:3000
```

---

## 📸 Screens

- Landing Page
- Login Page
- Register Page
- Dashboard
- Projects
- Tasks
- Audit Logs

---

## 👨‍💻 Author

Saranya

Internship Project Submission
