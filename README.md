# Shopping Cart Order System

A storefront flow for browsing products, managing a persistent cart, applying valid coupons, and placing mock orders. Cart and order data are saved locally so the flow remains usable across navigation and reloads.

## Tech stack
React + TypeScript, Vite, Tailwind CSS, React Router, axios.

## Getting started
```
npm install --legacy-peer-deps
cp .env.example .env
npm run dev
```
Then open http://localhost:56841

## Environment variables
See .env.example. VITE_API_URL is optional — every entity runs on local mock data (USE_MOCK = true in src/data/store.ts) until it's set and each entity's flag is flipped to false.

## Project structure
src/api — shared axios client for future live API integration.
src/components — navigation, cart controls, summaries, coupon form, and error boundary.
src/context — persistent CartContext state and calculations.
src/data — mock catalog data and localStorage-backed order store.
src/pages — catalog, cart, checkout, confirmation, and fallback screens.
src/routes — browser-router route definitions.
src/types — shared TypeScript domain types.
src/utils — display formatting helpers.
src/validation — reusable checkout validation functions.
