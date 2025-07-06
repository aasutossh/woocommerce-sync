# WooCommerce Sync – Server

Backend service to sync **WooCommerce orders and products** into a local MongoDB
database, built with **Express**, **TypeScript**, and **Node.js**.

---

## 🌟 Features

- 🔄 Syncs orders & products from WooCommerce
- 🧹 Automatically deletes outdated orders and unused products
- 🔍 Search, filter, sort support on both products & orders
- 📊 Stats endpoint for dashboard
- 📅 Daily cron support for automatic sync
- ⚙️ Logging with Winston & Morgan
- 📥 Error tracking with Sentry
- ✅ Unit & integration tests with Vitest and Supertest

---

## 🛠️ Tech Stack

| Tool              | Purpose                               |
|-------------------|----------------------------------------|
| **Express**       | Web framework                          |
| **Mongoose**      | MongoDB ODM                            |
| **Zod**           | Environment variable validation         |
| **Winston**       | General logging                        |
| **Morgan**        | HTTP logging middleware                |
| **Sentry**        | Error monitoring                       |
| **Vitest**        | Test runner                            |
| **Supertest**     | HTTP integration testing               |
| **Node-cron**     | Task scheduling for daily sync         |

---

## 🗂️ Project Structure

```md
server/
├── src/
│ ├── api/ # Express route handlers
│ ├── app.ts # Express app setup
│ ├── index.ts # Server entry point
│ ├── env.ts # Environment variable parsing (zod)
│ ├── models/ # Mongoose models (Order, Product)
│ ├── services/ # Sync, cleanup, WooCommerce API wrappers
│ ├── cron/ # Daily cron setup
│ ├── utils/ # Logger, helpers
│ ├── sentry.ts # Sentry setup
│ └── middlewares.ts # Global middlewares
├── logs/ # Log output files
├── test/ # Vitest + Supertest API tests
```

---

## 🚀 Setup & Development

### 1. Install dependencies

```bash
pnpm install
```

## 2. Create .env file

```js
NODE_ENV=development
PORT=3000

MONGODB_URI=mongodb://localhost:27017/woo-sync
WOOCOMMERCE_STORE_URL=https://yourstore.com
WOOCOMMERCE_CONSUMER_KEY=ck_xxx
WOOCOMMERCE_CONSUMER_SECRET=cs_xxx

SENTRY_DSN=https://example.ingest.sentry.io/123456
ORDER_LOOKBACK_DAYS=30
ORDER_DELETION_THRESHOLD_DAYS=90
```

## 3. Run the server

```bash
pnpm dev
```

The server runs on `http://localhost:3000`

## 📦 Build

```bash
pnpm build
```

## 🧪 Testing

Run tests:

```bash
pnpm test
```

### Uses

vitest

supertest

## 🌐 API Documentation

| Endpoint    | Method | Description                                |
| ----------- | ------ | ------------------------------------------ |
| `/orders`   | GET    | Paginated orders with search, sort, filter |
| `/products` | GET    | Paginated products with order count        |
| `/stats`    | GET    | Returns total counts of orders & products  |

/orders query params:
`page`, `limit`

`search` → id, number, name, billing/shipping

`status`

`sort` → total or date_created

`product_id` → filters orders containing the product

/products query params:
`page`, `limit`

`search` → name or SKU

`sort` → name or price

## 🧰 Logging

- HTTP logs: via `morgan` (writes to console)

- App logs: via `winston`, saved in:
-- logs/combined.log
-- logs/error.log

## 🛡️ Error Tracking

Integrated with Sentry. Just set `SENTRY_DSN` in `.env`.

Tracked errors include:

- Sync/cleanup failures

- Uncaught exceptions

## 🔁 Cron Jobs

- Scheduled via `node-cron`

- Automatically runs syncOrders() once per day

## 📌 Environment Variables

| Name                            | Required  | Description                               |
| ------------------------------- | --------- | ----------------------------------------- |
| `NODE_ENV`                      | ✅        | `development` / `production` / `test`     |
| `PORT`                          | ✅        | Port to run the server on                 |
| `MONGODB_URI`                   | ✅        | MongoDB connection string                 |
| `WOOCOMMERCE_STORE_URL`         | ✅        | WooCommerce store base URL                |
| `WOOCOMMERCE_CONSUMER_KEY`      | ✅        | WooCommerce REST API key                  |
| `WOOCOMMERCE_CONSUMER_SECRET`   | ✅        | WooCommerce REST API secret               |
| `SYNC_ORDER_WHEN_BOOT`          | ⚠️        | Sync orders when running (leave empty for false)|
| `SENTRY_DSN`                    | ⚠️        | Optional, for error reporting             |
| `ORDER_LOOKBACK_DAYS`           | ✅        | Lookback period (in days) to fetch orders |
| `ORDER_DELETION_THRESHOLD_DAYS` | ✅        | Orders older than this are deleted        |

## ⚠️ Known Issues / Limitations

- Assumes WooCommerce data is consistent (e.g., all products still exist)

- No retries on network failure during sync

- Cleanup depends on date_modified from Woo API (not stored in DB)

- No rate limiting or authentication

- Not using GraphQL

## 📜 License

MIT © 2025 – Aasutosh Jha
