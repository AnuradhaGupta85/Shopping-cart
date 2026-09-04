# Shopping Cart Order System — Routes & Navigation

## How to run
cd /home/ryzen/frontend_generator_backend-test/frontend_runs/run_75c82942_20260904_100643/project
npm install --legacy-peer-deps && npm run dev
Then open http://localhost:56841

## Routes

| Route | Page file | Description |
|-------|-----------|-------------|
| / | redirects | Redirects to the product catalog. |
| /catalog | src/pages/Catalog.tsx | Product catalog with product quantity selection and add-to-cart actions. |
| /cart | src/pages/Cart.tsx | Persistent cart, quantity controls, coupon entry, and order total. |
| /checkout | src/pages/Checkout.tsx | Validated delivery and payment form with a live order summary. |
| /confirmation/:orderId | src/pages/Confirmation.tsx | Submitted order receipt and total paid. |
| * | src/pages/NotFound.tsx | Unknown URL fallback with a Go home action. |

## Navigation map
- Catalog -> Cart (top-bar cart link, sidebar Cart link, or View cart button)
- Catalog -> Cart (add product, then choose the cart link)
- Cart -> Catalog (Continue shopping)
- Cart -> Checkout (Proceed to checkout)
- Checkout -> Cart (Back to cart)
- Checkout -> Confirmation (valid Place order submission)
- Confirmation -> Catalog (Continue shopping)
- Any page -> NotFound (unknown URL)
- Error boundary -> Catalog (Return to catalog)

## Shared components
- src/components/Sidebar.tsx — desktop NavLink navigation.
- src/components/TopBar.tsx — header and live cart item counter.
- src/components/QuantityControl.tsx — bounded plus/minus quantity controls.
- src/components/CouponForm.tsx — coupon validation and apply/remove feedback.
- src/components/OrderSummary.tsx — subtotal, discount, tax, and total breakdown.
- src/components/ErrorBoundary.tsx — class-based application error fallback and recovery actions.

## Design tokens
- primary: #2563EB
- primary-hover: #1D4ED8
- text: #111827
- muted: #6B7280
- background: #F9FAFB
- surface: #FFFFFF
- border: #E5E7EB
- success: #16A34A
- warning: #D97706
- danger: #DC2626
