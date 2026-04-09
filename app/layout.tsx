import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CartProvider } from '@/lib/cart-context'
import { AuthProvider } from '@/lib/auth-context'
import { OrderProvider } from '@/lib/order-context'
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: 'AutoParts Pro - Car & Bike Parts Store',
  description: 'Your one-stop shop for quality automotive parts. Find car and bike parts at competitive prices with fast shipping.',
  keywords: ['auto parts', 'car parts', 'bike parts', 'motorcycle parts', 'automotive'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <AuthProvider>
          <CartProvider>
            <OrderProvider>
              {children}
            </OrderProvider>
          </CartProvider>
        </AuthProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
