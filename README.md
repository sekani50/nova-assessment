# NOVACRUST Crypto Checkout

A modern, embeddable crypto payment checkout experience built with React, TypeScript, Vite, and shadcn/ui. Similar to Stripe Checkout but designed for cryptocurrency payments.

## Features

- **Multi-tab Interface**: Support for Crypto to Cash, Cash to Crypto, and Crypto to Fiat Loan
- **Complete Checkout Flow**: 
  - Payment details input with currency selection
  - Recipient bank details collection
  - Recipient contact information
  - Payment confirmation and processing
- **Form Validation**: Comprehensive Zod validation with real-time error messages
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **Type-Safe**: Full TypeScript support throughout
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI component library
- **Zod** - Schema validation
- **Lucide React** - Icons

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd novacrust-assessment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

### Build for Production

```bash
npm run build
```

The production build will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## Project Structure

```
novacrust-assessment/
├── src/
│   ├── components/
│   │   ├── checkout/          # Checkout flow components
│   │   │   ├── CryptoCheckout.tsx
│   │   │   ├── PaymentDetailsForm.tsx
│   │   │   ├── RecipientBankForm.tsx
│   │   │   ├── RecipientContactForm.tsx
│   │   │   ├── SendPaymentScreen.tsx
│   │   │   ├── ProcessingScreen.tsx
│   │   │   └── ComingSoonScreen.tsx
│   │   └── ui/                # shadcn/ui components
│   ├── schema/
│   │   └── global.schema.ts   # Zod validation schemas
│   ├── types/
│   │   └── checkout.ts        # TypeScript type definitions
│   ├── data/
│   │   └── mockData.ts        # Mock data (currencies, wallets, etc.)
│   ├── lib/
│   │   └── utils.ts           # Utility functions
│   └── assets/
│       └── nova-logo.png      # NOVACRUST logo
├── public/                     # Static assets
├── index.html
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## Assumptions & Trade-offs

### Assumptions

1. **No Backend Integration**: All data is mocked. The checkout flow simulates a real payment process without actual API calls.

2. **Fixed Conversion Rate**: The conversion rate between crypto and fiat is hardcoded at 1:1500 (e.g., 1 ETH = 1500 NGN) for demonstration purposes.

3. **Account Name Lookup**: The bank account name lookup is simulated - entering a 10-digit account number automatically populates "ODUTUGA GBEKE" as a mock account name.

4. **Transaction ID**: The transaction ID shown on the processing screen is hardcoded as "NC123456789".

5. **Crypto Address**: The payment address shown in the send payment screen is a mock address "4LiV4YjbxsL6739MKghUd".

6. **Currency Logos**: Cryptocurrency logos are loaded from CoinGecko CDN. Wallet logos use GitHub avatars and official sources.

7. **Email Validation**: Email validation uses Zod's built-in email validator, which follows standard email format rules.

8. **Phone Number Format**: Phone numbers are validated to contain at least 10 digits, but formatting is flexible (allows spaces, dashes, etc.).

9. **Account Number**: Nigerian bank account numbers are assumed to be exactly 10 digits and numeric only.

### Trade-offs

1. **No Real-time Exchange Rates**: Conversion rates are static. In production, these would be fetched from a cryptocurrency exchange API.

2. **No Wallet Integration**: The wallet selection is UI-only. No actual wallet connection (MetaMask, WalletConnect, etc.) is implemented.

3. **No Payment Processing**: The "I have sent it" button doesn't actually verify blockchain transactions. It just moves to the processing screen.

4. **No Persistence**: Form data is not persisted. Refreshing the page resets all entered data.

5. **No Error Recovery**: Network errors, API failures, or other edge cases are not handled since there's no backend.

6. **Limited Currency Support**: Only a few cryptocurrencies (ETH, BTC, USDT variants) and fiat currencies (NGN, USD, EUR) are included.

7. **No Multi-step Persistence**: If a user navigates away and comes back, they would need to start the checkout flow from the beginning.

8. **Simplified Validation**: Some validations are simplified (e.g., account number length is fixed at 10 digits, which may not apply to all banks).

9. **Static Transaction Status**: The processing screen doesn't actually check transaction status - it just displays a static "processing" message.

10. **No Loading States**: While there are some loading indicators, most operations are instant since there's no actual API calls.

## Form Validation

All forms use Zod validation schemas defined in `src/schema/global.schema.ts`:

- **Payment Details**: Validates amounts (must be > 0), currency selection, wallet, and payment method
- **Recipient Bank**: Validates bank selection and account number (10 digits, numeric only)
- **Recipient Contact**: Validates email format and phone number (at least 10 digits)
- **Coming Soon Email**: Validates email format

Error messages are displayed in real-time below each field, and errors clear when users start typing.

## Customization

### Adding New Currencies

Edit `src/data/mockData.ts` to add new cryptocurrencies or fiat currencies:

```typescript
export const cryptocurrencies: Currency[] = [
  // Add your currency here
  { code: "NEW", name: "New Coin", symbol: "N", icon: "icon-url" }
]
```

### Adding New Wallets

Edit `src/data/mockData.ts` to add new wallet options:

```typescript
export const wallets: Wallet[] = [
  // Add your wallet here
  { id: "new-wallet", name: "New Wallet", icon: "icon-url" }
]
```

### Styling

The project uses Tailwind CSS with custom colors defined in `tailwind.config.js`. The primary color is `#013941` (dark teal). You can modify colors in:

- `tailwind.config.js` - Theme configuration
- `src/index.css` - CSS variables for shadcn/ui

### Fonts

The project uses:
- **Outfit** - Primary font (body text)
- **Clash Display** - Display font (headings)

Fonts are loaded from Google Fonts in `index.html`.

## Development Notes

- The project uses path aliases (`@/`) for cleaner imports
- All components are functional components with TypeScript
- Form state is managed at the parent level (`CryptoCheckout.tsx`)
- Validation happens on form submission, with real-time error clearing
- The checkout flow is linear: payment-details → recipient-bank → recipient-contact → send-payment → processing

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires ES2020+ support
- No Internet Explorer support

## License

This is an assessment project for NOVACRUST.

