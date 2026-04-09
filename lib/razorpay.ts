// Razorpay configuration
// In production, use environment variables:
// RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET

export const RAZORPAY_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_demo123456789"

export interface RazorpayOrder {
  id: string
  amount: number
  currency: string
  receipt: string
  status: string
}

export interface RazorpayPaymentResponse {
  razorpay_payment_id: string
  razorpay_order_id: string
  razorpay_signature: string
}

export interface RazorpayOptions {
  key: string
  amount: number
  currency: string
  name: string
  description: string
  image?: string
  order_id: string
  handler: (response: RazorpayPaymentResponse) => void
  prefill: {
    name: string
    email: string
    contact?: string
  }
  notes?: Record<string, string>
  theme: {
    color: string
  }
  modal?: {
    ondismiss?: () => void
  }
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => {
      open: () => void
      close: () => void
    }
  }
}

export function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window !== "undefined" && window.Razorpay) {
      resolve(true)
      return
    }

    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.async = true
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}
