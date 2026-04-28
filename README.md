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
