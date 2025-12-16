import { Currency, Wallet } from "@/types/checkout"

//? Using CoinGecko API for crypto logos
const CRYPTO_LOGO_BASE = "https://assets.coingecko.com/coins/images"

export const cryptocurrencies: Currency[] = [
  { 
    code: "ETH", 
    name: "Ethereum", 
    symbol: "Ξ",
    icon: `${CRYPTO_LOGO_BASE}/279/large/ethereum.png`
  },
  { 
    code: "BTC", 
    name: "Bitcoin", 
    symbol: "₿",
    icon: `${CRYPTO_LOGO_BASE}/1/large/bitcoin.png`
  },
  { 
    code: "USDT", 
    name: "Tether", 
    symbol: "USDT",
    icon: `${CRYPTO_LOGO_BASE}/325/large/Tether.png`
  },
  { 
    code: "USDT-CELO", 
    name: "USDT - CELO", 
    symbol: "USDT",
    icon: `${CRYPTO_LOGO_BASE}/325/large/Tether.png`
  },
  { 
    code: "USDT-TON", 
    name: "USDT - TON", 
    symbol: "USDT",
    icon: `${CRYPTO_LOGO_BASE}/325/large/Tether.png`
  },
  { 
    code: "USDT-BNB", 
    name: "USDT - BNB", 
    symbol: "USDT",
    icon: `${CRYPTO_LOGO_BASE}/325/large/Tether.png`
  },
]

export const fiatCurrencies: Currency[] = [
  { code: "NGN", name: "Nigerian Naira", symbol: "₦" },
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
]

export const wallets: Wallet[] = [
  { 
    id: "metamask", 
    name: "Metamask",
    icon: "https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"
  },
  { 
    id: "rainbow", 
    name: "Rainbow",
    icon: "https://avatars.githubusercontent.com/u/43248574?s=200&v=4"
  },
  { 
    id: "walletconnect", 
    name: "WalletConnect",
    icon: "https://avatars.githubusercontent.com/u/37784886?s=200&v=4"
  },
  { 
    id: "other", 
    name: "Other Crypto Wallets (Binance, Coinbase, Bybit etc)",
    icon: "wallet-icon" 
  },
]

export const paymentMethods: { value: string; label: string }[] = [
  { value: "bank", label: "Bank Transfer" },
  { value: "mobile", label: "Mobile Money" },
  { value: "cash", label: "Cash Pickup" },
]

export const banks: { value: string; label: string }[] = [
  { value: "access", label: "Access Bank" },
  { value: "gtb", label: "GTBank" },
  { value: "first", label: "First Bank" },
  { value: "zenith", label: "Zenith Bank" },
  { value: "uba", label: "UBA" },
  { value: "fidelity", label: "Fidelity Bank" },
]

