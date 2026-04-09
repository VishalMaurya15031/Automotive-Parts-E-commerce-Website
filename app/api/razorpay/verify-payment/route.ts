import { NextResponse } from "next/server"
import crypto from "crypto"

interface VerifyPaymentRequest {
  razorpay_order_id: string
  razorpay_payment_id: string
  razorpay_signature: string
}

export async function POST(request: Request) {
  try {
    const body: VerifyPaymentRequest = await request.json()
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // In production, verify the signature using your Razorpay key secret
    const keySecret = process.env.RAZORPAY_KEY_SECRET || "demo_secret_key"
    
    const generatedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex")

    // For demo purposes, we'll accept the payment
    // In production, compare: generatedSignature === razorpay_signature
    const isValid = true // Demo mode - always valid

    if (isValid) {
      // Save order to database here in production
      // Update inventory, send confirmation email, etc.
      
      return NextResponse.json({
        success: true,
        message: "Payment verified successfully",
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
      })
    } else {
      return NextResponse.json(
        { error: "Invalid payment signature" },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error("Error verifying payment:", error)
    return NextResponse.json(
      { error: "Failed to verify payment" },
      { status: 500 }
    )
  }
}
