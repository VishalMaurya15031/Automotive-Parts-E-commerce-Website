import { NextResponse } from "next/server"
import crypto from "crypto"

// In production, use: import Razorpay from "razorpay"
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID!,
//   key_secret: process.env.RAZORPAY_KEY_SECRET!,
// })

interface CreateOrderRequest {
  amount: number
  currency?: string
  receipt?: string
  notes?: Record<string, string>
}

export async function POST(request: Request) {
  try {
    const body: CreateOrderRequest = await request.json()
    const { amount, currency = "INR", receipt, notes } = body

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid amount" },
        { status: 400 }
      )
    }

    // Convert to paise (Razorpay expects amount in smallest currency unit)
    const amountInPaise = Math.round(amount * 100)

    // Generate a unique order ID for demo
    // In production, use razorpay.orders.create()
    const orderId = `order_${crypto.randomBytes(8).toString("hex")}`

    // Demo order response (simulates Razorpay API response)
    const order = {
      id: orderId,
      entity: "order",
      amount: amountInPaise,
      amount_paid: 0,
      amount_due: amountInPaise,
      currency,
      receipt: receipt || `receipt_${Date.now()}`,
      status: "created",
      notes: notes || {},
      created_at: Math.floor(Date.now() / 1000),
    }

    // In production with real Razorpay:
    // const order = await razorpay.orders.create({
    //   amount: amountInPaise,
    //   currency,
    //   receipt: receipt || `receipt_${Date.now()}`,
    //   notes,
    // })

    return NextResponse.json(order)
  } catch (error) {
    console.error("Error creating Razorpay order:", error)
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    )
  }
}
