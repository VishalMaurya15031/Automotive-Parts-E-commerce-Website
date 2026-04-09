"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { 
  ChevronRight, 
  CreditCard, 
  ShoppingBag, 
  ArrowRight,
  Shield,
  CheckCircle2,
  Loader2
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/lib/auth-context"
import { loadRazorpayScript, RAZORPAY_KEY_ID, type RazorpayPaymentResponse } from "@/lib/razorpay"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, totalPrice, clearCart } = useCart()
  const { user, isAuthenticated } = useAuth()
  
  const [isLoading, setIsLoading] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [paymentDetails, setPaymentDetails] = useState<{
    orderId: string
    paymentId: string
  } | null>(null)
  
  // Shipping form
  const [shippingInfo, setShippingInfo] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  })

  const shipping = totalPrice > 50 ? 0 : 9.99
  const tax = totalPrice * 0.08
  const orderTotal = totalPrice + shipping + tax
  
  // Convert USD to INR (approximate rate for demo)
  const orderTotalINR = Math.round(orderTotal * 83)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login?redirect=/checkout")
    }
  }, [isAuthenticated, router])

  useEffect(() => {
    if (user) {
      setShippingInfo(prev => ({
        ...prev,
        name: user.name,
        email: user.email,
      }))
    }
  }, [user])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setShippingInfo(prev => ({ ...prev, [name]: value }))
  }

  const validateForm = () => {
    const required = ["name", "email", "phone", "address", "city", "state", "pincode"]
    for (const field of required) {
      if (!shippingInfo[field as keyof typeof shippingInfo]) {
        alert(`Please fill in ${field}`)
        return false
      }
    }
    return true
  }

  const handlePayment = async () => {
    if (!validateForm()) return
    if (items.length === 0) {
      alert("Your cart is empty")
      return
    }

    setIsLoading(true)

    try {
      // Load Razorpay script
      const loaded = await loadRazorpayScript()
      if (!loaded) {
        alert("Failed to load Razorpay. Please try again.")
        setIsLoading(false)
        return
      }

      // Create order on server
      const response = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: orderTotalINR,
          currency: "INR",
          receipt: `order_${Date.now()}`,
          notes: {
            customerName: shippingInfo.name,
            customerEmail: shippingInfo.email,
          },
        }),
      })

      const order = await response.json()

      if (!order.id) {
        throw new Error("Failed to create order")
      }

      // Initialize Razorpay checkout
      const razorpay = new window.Razorpay({
        key: RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "AutoParts Pro",
        description: "Purchase of automotive parts",
        order_id: order.id,
        handler: async (response: RazorpayPaymentResponse) => {
          // Verify payment on server
          const verifyResponse = await fetch("/api/razorpay/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          })

          const result = await verifyResponse.json()

          if (result.success) {
            setPaymentDetails({
              orderId: result.orderId,
              paymentId: result.paymentId,
            })
            setPaymentSuccess(true)
            clearCart()
          } else {
            alert("Payment verification failed. Please contact support.")
          }
          setIsLoading(false)
        },
        prefill: {
          name: shippingInfo.name,
          email: shippingInfo.email,
          contact: shippingInfo.phone,
        },
        notes: {
          address: `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state} - ${shippingInfo.pincode}`,
        },
        theme: {
          color: "#dc4a26",
        },
        modal: {
          ondismiss: () => {
            setIsLoading(false)
          },
        },
      })

      razorpay.open()
    } catch (error) {
      console.error("Payment error:", error)
      alert("Something went wrong. Please try again.")
      setIsLoading(false)
    }
  }

  if (paymentSuccess && paymentDetails) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <div className="mx-auto max-w-2xl px-4 py-16 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="mt-6 text-3xl font-bold text-foreground">
              Payment Successful!
            </h1>
            <p className="mt-2 text-muted-foreground">
              Thank you for your purchase. Your order has been confirmed.
            </p>
            
            <Card className="mt-8 text-left">
              <CardHeader>
                <CardTitle className="text-lg">Order Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Order ID:</span>
                  <span className="font-mono text-foreground">{paymentDetails.orderId}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Payment ID:</span>
                  <span className="font-mono text-foreground">{paymentDetails.paymentId}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Amount Paid:</span>
                  <span className="font-semibold text-foreground">Rs. {orderTotalINR.toLocaleString("en-IN")}</span>
                </div>
                <Separator className="my-4" />
                <div className="text-sm text-muted-foreground">
                  A confirmation email has been sent to {shippingInfo.email}
                </div>
              </CardContent>
            </Card>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link href="/products">
                <Button>
                  Continue Shopping
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline">
                  Go to Home
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-8">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/cart" className="hover:text-foreground">Cart</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Checkout</span>
          </nav>

          <h1 className="mb-8 text-3xl font-bold text-foreground">Checkout</h1>

          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card py-16">
              <ShoppingBag className="h-16 w-16 text-muted-foreground" />
              <h2 className="mt-4 text-xl font-semibold text-foreground">
                Your cart is empty
              </h2>
              <Link href="/products">
                <Button className="mt-6">
                  Start Shopping
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Shipping Information */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Shipping Information</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={shippingInfo.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={shippingInfo.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={shippingInfo.phone}
                        onChange={handleInputChange}
                        placeholder="+91 9876543210"
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={shippingInfo.address}
                        onChange={handleInputChange}
                        placeholder="123 Main Street, Apartment 4B"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={shippingInfo.city}
                        onChange={handleInputChange}
                        placeholder="Mumbai"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        name="state"
                        value={shippingInfo.state}
                        onChange={handleInputChange}
                        placeholder="Maharashtra"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pincode">Pincode</Label>
                      <Input
                        id="pincode"
                        name="pincode"
                        value={shippingInfo.pincode}
                        onChange={handleInputChange}
                        placeholder="400001"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Order Items */}
                <Card>
                  <CardHeader>
                    <CardTitle>Order Items ({items.length})</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex gap-4">
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-muted">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">{item.product.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Qty: {item.quantity} x ${item.product.price.toFixed(2)}
                          </p>
                        </div>
                        <div className="font-semibold text-foreground">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary & Payment */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Subtotal</span>
                          <span className="font-medium">${totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Shipping</span>
                          <span className="font-medium">
                            {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Tax (8%)</span>
                          <span className="font-medium">${tax.toFixed(2)}</span>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex justify-between">
                        <span className="font-semibold">Total (USD)</span>
                        <span className="font-bold">${orderTotal.toFixed(2)}</span>
                      </div>
                      
                      <div className="flex justify-between rounded-lg bg-primary/10 p-3">
                        <span className="font-semibold text-primary">Total (INR)</span>
                        <span className="font-bold text-primary">
                          Rs. {orderTotalINR.toLocaleString("en-IN")}
                        </span>
                      </div>

                      <Button
                        className="w-full"
                        size="lg"
                        onClick={handlePayment}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <CreditCard className="mr-2 h-4 w-4" />
                            Pay with Razorpay
                          </>
                        )}
                      </Button>

                      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                        <Shield className="h-4 w-4" />
                        <span>Secured by Razorpay</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Payment Methods Info */}
                  <Card>
                    <CardContent className="pt-6">
                      <p className="text-sm font-medium text-foreground mb-3">
                        Accepted Payment Methods
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded bg-muted px-2 py-1 text-xs">UPI</span>
                        <span className="rounded bg-muted px-2 py-1 text-xs">Debit Card</span>
                        <span className="rounded bg-muted px-2 py-1 text-xs">Credit Card</span>
                        <span className="rounded bg-muted px-2 py-1 text-xs">Net Banking</span>
                        <span className="rounded bg-muted px-2 py-1 text-xs">Wallets</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
