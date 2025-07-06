# WooCommerce Sync – Full Stack Monorepo

A full-stack monorepo to sync WooCommerce **orders and products** into a local
MongoDB database and visualize them with a responsive **React + Tailwind frontend**.

---

## 🧱 Project Structure

```bash
├── client/ # React 18 + Vite + Tailwind
├── server/ # Node.js + Express + MongoDB + WooCommerce API
├── .gitignore
├── pnpm-workspace.yaml
└── README.md
```

---

## 🔧 Tech Stack

| Layer     | Stack                                   |
|-----------|------------------------------------------|
| Frontend  | React 18, Vite, Tailwind CSS, Framer Motion |
| Backend   | Node.js, Express, Mongoose, Zod         |
| Sync/API  | WooCommerce REST API                    |
| Logging   | Winston, Morgan                         |
| Errors    | Sentry (frontend + backend)             |
| Testing   | Vitest, Supertest (backend), React Testing Library (frontend) |

---

## 📋 Requirements
Before you begin, ensure you have the following installed:

| Tool                           | Version   | Install Guide           |
| ------------------------------ | --------- | ----------------------- |
| [Node.js](https://nodejs.org/) | **v20.x** | Recommended LTS version |
| [pnpm](https://pnpm.io/)       | **v8+**   | `npm install -g pnpm`   |


ℹ️ This project uses pnpm workspaces, so using pnpm is required.

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/aasutossh/woocommerce-sync.git
cd woocommerce-sync
```

### 2. Install dependencies (client + server)

```bash
pnpm install
```

This uses a pnpm workspace to manage shared dependencies.

## 📦 Project Setup

### ⬆️ Backend Setup (/server)
Follow the instructions in server/README.md:

```bash
cd server
cp .env.example .env
pnpm dev
```

### ⬇️ Frontend Setup (/client)

Follow the instructions in client/README.md:

```bash
cd client
cp .env.example .env
pnpm dev
```

## 🌐 API Overview

The frontend communicates with the server via:

```bash
GET /api/v1/orders
GET /api/v1/products
GET /api/v1/stats
```

All endpoints support pagination, filtering, searching, and sorting.

## 🧪 Running Tests

Frontend: inside /client

```bash
pnpm test
```

Backend: inside /server

```bash
pnpm test
```

## 📜 License

MIT © 2025 – Aasutosh Jha
