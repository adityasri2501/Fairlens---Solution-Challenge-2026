# FairLens

FairLens is an Unbiased AI Decision Platform designed to help organizations detect, mitigate, and report on algorithmic bias in their machine learning models.

## Setup

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Setup Supabase:
   - Create a Supabase project
   - Copy `.env.local.example` to `.env.local` and add credentials
   - Generate Prisma schema and push to DB:
     ```bash
     npx prisma generate
     npx prisma db push
     ```
   - Seed database:
     ```bash
     npx prisma db seed
     ```

3. Setup Google Cloud:
   - Create GCP project, enable required APIs
   - Set up GCS bucket, BigQuery dataset, and Pub/Sub
   - Add credentials to `.env.local`

4. Run ML Service (Python):
   ```bash
   cd services/ml
   pip install -r requirements.txt
   uvicorn main:app --reload --port 8080
   ```

5. Run Next.js App:
   ```bash
   pnpm dev
   ```

## Deployment
See the provided documentation for Vercel and Cloud Run deployment steps.

## Project Structure

```text
fairlens/
├─ .git/                     # Git repository
├─ .gitignore                # Ignored files (env, node_modules, etc.)
├─ .env.local                # Local environment variables (kept private)
├─ app/
│   ├─ (auth)/
│   │   └─ login/
│   │       └─ page.jsx
│   ├─ (dashboard)/
│   │   ├─ data-scientist/
│   │   │   ├─ page.jsx
│   │   │   ├─ upload/
│   │   │   │   └─ page.jsx
│   │   │   ├─ mitigate/
│   │   │   │   └─ page.jsx
│   │   │   └─ proxy-variables/
│   │   │       └─ page.jsx
│   │   ├─ compliance/
│   │   │   ├─ page.jsx
│   │   │   ├─ audit-trail/
│   │   │   │   └─ page.jsx
│   │   │   └─ reports/
│   │   │       └─ page.jsx
│   │   └─ product-manager/
│   │       └─ ... (pages)
│   ├─ api/
│   │   └─ bias/
│   │       ├─ scan/
│   │       │   └─ route.js
│   │       ├─ mitigate/
│   │       │   └─ route.js
│   │       └─ proxy/
│   │           └─ route.js
│   ├─ globals.css
│   └─ layout.jsx
├─ components/
│   ├─ layout/
│   └─ ui/
├─ lib/
│   ├─ firebase.js
│   ├─ firebaseAdmin.js
│   └─ store/
│       └─ authStore.js
├─ prisma/
│   └─ schema.prisma
├─ services/
│   └─ ml/
│       ├─ Dockerfile
│       ├─ main.py
│       ├─ requirements.txt
│       └─ routers/
│           ├─ bias_scan.py
│           ├─ mitigate.py
│           └─ proxy.py
├─ package.json
├─ next.config.mjs
└─ README.md
```
