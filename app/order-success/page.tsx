"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { CheckCircle, Package, ArrowRight, Home } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Suspense } from "react"

function OrderSuccessContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("order_id")
  const paymentId = searchParams.get("payment_id")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-2xl px-4 py-16">
          <div className="text-center">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-14 w-14 text-green-600" />
            </div>
            
            <h1 className="mt-6 text-3xl font-bold text-foreground">
              Payment Successful!
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Thank you for your order. Your payment has been processed successfully.
            </p>
          </div>

          <Card className="mt-8">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Order Details
              </h2>
              
              <div className="space-y-3">
                {orderId && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Order ID</span>
                    <span className="font-medium text-foreground">{orderId}</span>
                  </div>
                )}
                {paymentId && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payment ID</span>
                    <span className="font-medium text-foreground">{paymentId}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <span className="inline-flex items-center gap-1 font-medium text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    Confirmed
                  </span>
                </div>
              </div>

              <div className="mt-6 rounded-lg bg-muted/50 p-4">
                <div className="flex items-start gap-3">
                  <Package className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">What happens next?</p>
                    <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                      <li>You will receive an order confirmation email shortly</li>
                      <li>Your order will be processed within 1-2 business days</li>
                      <li>You will receive tracking information once shipped</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/products">
              <Button size="lg">
                Continue Shopping
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" size="lg">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </main>
        <Footer />
      </div>
    }>
      <OrderSuccessContent />
    </Suspense>
  )
}
