# WooCommerce Sync – Client

Frontend for WooCommerce Order & Product Sync Viewer built with **React 18**,
**Vite**, and **Tailwind CSS**.

---

## 🌟 Features

- ⚡ Fast Vite-powered React app
- 🎨 Tailwind CSS with responsive layout
- 🧾 Paginated Orders and Products
- 🔍 Search, filter, and sort capabilities
- 🔄 Clickable cross-page linking (e.g., order count links to orders)
- 🧱 Skeleton loading & consistent layout
- 📱 Responsive sidebar with mobile toggle
- 🐛 Error monitoring with Sentry

---

## 🛠️ Tech Stack

| Tool          | Purpose                              |
|---------------|---------------------------------------|
| **React 18**  | UI framework                          |
| **Vite**      | Build & dev server                    |
| **TypeScript**| Type safety                           |
| **Tailwind CSS** | Utility-first styling              |
| **Framer Motion** | Subtle animations                 |
| **Sentry**    | Error monitoring                      |
| **React Router** | Client-side routing                |

---

## 📦 Project Structure

```yaml
client/
├── public/ # Static assets (favicon, robots.txt)
├── src/
│ ├── assets/ # Images and icons
│ ├── components/ # Shared UI components (Layout, Pagination, etc.)
│ ├── hooks/ # Custom hooks
│ ├── pages/ # Pages: Dashboard, Orders, Products
│ ├── types/ # TypeScript types
│ ├── utils/ # Utility functions
│ └── sentry.ts # Sentry config
├── index.html
├── vite.config.ts # Vite configuration
└── tsconfig.json # TypeScript config
```

---

## 🚀 Setup & Development

### 1. Install dependencies

```bash
pnpm install
```

### 2. Create .env file

```env
VITE_API_BASE=http://localhost:3000/api/v1
```

### 3. Run the app

```bash
pnpm dev
```

The app will be available at `http://localhost:5173`

### 🔧 Build

```bash
pnpm build
```

## 🌐 Environment Variables

| Variable        | Required | Description                  |
| --------------- | -------- | ---------------------------- |
| `VITE_API_BASE` | ✅        | Base URL for the backend API |

All environment variables must start with `VITE_` to be exposed in client code.

## 📚 API Integration

This frontend expects the following API endpoints from the server:

- `GET /orders`: supports search, status, sort, page, limit, and product_id

- `GET /products`: supports search, sort, page, limit

- `GET /stats`: returns total counts for dashboard

## 🧪 Testing

Basic unit tests are located in:

```bash
src/components/*.test.tsx
```

Run tests:

```bash
pnpm test
```

## ⚠️ Known Issues / Limitations

- Project is only for view limited data from the original server

- Read only data (Doesn't write changes to original server)

- No authentication or role-based access.

- Assumes backend conforms to the required data shape.

## 📜 License

MIT © 2025 – Aasutosh Jha
