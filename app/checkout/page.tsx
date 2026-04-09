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
import { useOrders } from "@/lib/order-context"
import { loadRazorpayScript, RAZORPAY_KEY_ID, type RazorpayPaymentResponse } from "@/lib/razorpay"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, totalPrice, clearCart } = useCart()
  const { user, isAuthenticated } = useAuth()
  const { addOrder } = useOrders()
  
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
            // Save order to context
            const savedOrder = addOrder({
              razorpayOrderId: result.orderId,
              razorpayPaymentId: result.paymentId,
              userId: user?.id || "",
              items: [...items],
              totalPrice: orderTotal,
              totalPriceINR: orderTotalINR,
              shippingInfo: { ...shippingInfo },
            })
            
            setPaymentDetails({
              orderId: savedOrder.id,
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
              <Link href="/orders">
                <Button className="bg-gradient-to-r from-[#e94560] to-[#ff6b6b] hover:from-[#d63d56] hover:to-[#e85f5f]">
                  View My Orders
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/products">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  Continue Shopping
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
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/cart" className="hover:text-white">Cart</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white">Checkout</span>
          </nav>

          <h1 className="mb-8 text-3xl font-bold text-white">Checkout</h1>

          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-white/20 bg-white/5 py-16">
              <ShoppingBag className="h-16 w-16 text-gray-400" />
              <h2 className="mt-4 text-xl font-semibold text-white">
                Your cart is empty
              </h2>
              <Link href="/products">
                <Button className="mt-6 bg-gradient-to-r from-[#e94560] to-[#ff6b6b] hover:from-[#d63d56] hover:to-[#e85f5f]">
                  Start Shopping
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Shipping Information */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">Shipping Information</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-300">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={shippingInfo.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-300">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={shippingInfo.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-gray-300">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={shippingInfo.phone}
                        onChange={handleInputChange}
                        placeholder="+91 9876543210"
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="address" className="text-gray-300">Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={shippingInfo.address}
                        onChange={handleInputChange}
                        placeholder="123 Main Street, Apartment 4B"
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-gray-300">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={shippingInfo.city}
                        onChange={handleInputChange}
                        placeholder="Mumbai"
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state" className="text-gray-300">State</Label>
                      <Input
                        id="state"
                        name="state"
                        value={shippingInfo.state}
                        onChange={handleInputChange}
                        placeholder="Maharashtra"
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pincode" className="text-gray-300">Pincode</Label>
                      <Input
                        id="pincode"
                        name="pincode"
                        value={shippingInfo.pincode}
                        onChange={handleInputChange}
                        placeholder="400001"
                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Order Items */}
                <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">Order Items ({items.length})</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex gap-4">
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-white/10">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-white">{item.product.name}</h4>
                          <p className="text-sm text-gray-400">
                            Qty: {item.quantity} x ${item.product.price.toFixed(2)}
                          </p>
                        </div>
                        <div className="font-semibold text-white">
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
                  <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-white">Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Subtotal</span>
                          <span className="font-medium text-white">${totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Shipping</span>
                          <span className="font-medium text-white">
                            {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Tax (8%)</span>
                          <span className="font-medium text-white">${tax.toFixed(2)}</span>
                        </div>
                      </div>
                      
                      <Separator className="bg-white/10" />
                      
                      <div className="flex justify-between">
                        <span className="font-semibold text-white">Total (USD)</span>
                        <span className="font-bold text-white">${orderTotal.toFixed(2)}</span>
                      </div>
                      
                      <div className="flex justify-between rounded-lg bg-gradient-to-r from-[#4ecdc4]/20 to-[#44a08d]/20 border border-[#4ecdc4]/30 p-3">
                        <span className="font-semibold text-[#4ecdc4]">Total (INR)</span>
                        <span className="font-bold text-[#4ecdc4]">
                          Rs. {orderTotalINR.toLocaleString("en-IN")}
                        </span>
                      </div>

                      <Button
                        className="w-full bg-gradient-to-r from-[#e94560] to-[#ff6b6b] hover:from-[#d63d56] hover:to-[#e85f5f]"
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

                      <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                        <Shield className="h-4 w-4 text-[#4ecdc4]" />
                        <span>Secured by Razorpay</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Payment Methods Info */}
                  <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
                    <CardContent className="pt-6">
                      <p className="text-sm font-medium text-white mb-3">
                        Accepted Payment Methods
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded bg-white/10 px-2 py-1 text-xs text-gray-300">UPI</span>
                        <span className="rounded bg-white/10 px-2 py-1 text-xs text-gray-300">Debit Card</span>
                        <span className="rounded bg-white/10 px-2 py-1 text-xs text-gray-300">Credit Card</span>
                        <span className="rounded bg-white/10 px-2 py-1 text-xs text-gray-300">Net Banking</span>
                        <span className="rounded bg-white/10 px-2 py-1 text-xs text-gray-300">Wallets</span>
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
