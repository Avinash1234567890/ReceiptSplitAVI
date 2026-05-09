# Receipt Split Avi – Split bills fairly

A Next.js app to split restaurant bills based on what each person actually ordered.

## Getting Started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- 🧾 Review & edit receipt items
- 👥 Add people and assign items to them
- 💸 Auto-calculates per-person totals with tax & tip
- 📱 Generates Venmo deep-links for easy payment

## Tech Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS v4**
- **shadcn/ui** components (Button, Input, Dialog)
- System font stack (no external font dependencies)

## Project Structure

```
app/
  page.tsx          # Landing page
  upload/           # Receipt upload (OCR coming soon)
  review/           # Edit items, set tax & tip
  split/            # Add people, assign items
  totals/           # Per-person totals + Venmo links
  context/          # SplitContext global state
components/         # Reusable UI components
lib/                # Types, utilities, calculations
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
