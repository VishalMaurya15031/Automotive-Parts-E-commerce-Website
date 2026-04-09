"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { 
  Package, 
  ChevronRight, 
  ShoppingBag, 
  ArrowRight,
  CheckCircle,
  Clock,
  Truck,
  PackageCheck
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/lib/auth-context"
import { useOrders } from "@/lib/order-context"
import type { Order } from "@/lib/types"

const statusConfig: Record<Order["status"], { 
  label: string
  icon: typeof CheckCircle
  color: string 
}> = {
  pending: { label: "Pending", icon: Clock, color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  confirmed: { label: "Confirmed", icon: CheckCircle, color: "bg-green-500/20 text-green-400 border-green-500/30" },
  processing: { label: "Processing", icon: Package, color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  shipped: { label: "Shipped", icon: Truck, color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
  delivered: { label: "Delivered", icon: PackageCheck, color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export default function OrdersPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const { getOrdersByUserId } = useOrders()
  
  const userOrders = user ? getOrdersByUserId(user.id) : []

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login?redirect=/orders")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-4 py-8">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white">My Orders</span>
          </nav>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">Order History</h1>
            <p className="mt-1 text-gray-400">Track and manage your orders</p>
          </div>

          {userOrders.length === 0 ? (
            <Card className="border-white/10 bg-white/5 backdrop-blur-sm">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/10">
                  <ShoppingBag className="h-10 w-10 text-gray-400" />
                </div>
                <h2 className="mt-6 text-xl font-semibold text-white">
                  No orders yet
                </h2>
                <p className="mt-2 text-center text-gray-400">
                  You haven&apos;t placed any orders yet. Start shopping to see your orders here.
                </p>
                <Link href="/products">
                  <Button className="mt-6 bg-gradient-to-r from-[#e94560] to-[#ff6b6b] hover:from-[#d63d56] hover:to-[#e85f5f]">
                    Start Shopping
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {userOrders.map((order) => {
                const StatusIcon = statusConfig[order.status].icon
                return (
                  <Card key={order.id} className="border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
                    <CardHeader className="border-b border-white/10 bg-white/5">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-lg text-white">
                            Order {order.id}
                          </CardTitle>
                          <p className="text-sm text-gray-400">
                            Placed on {formatDate(order.orderDate)}
                          </p>
                        </div>
                        <Badge className={`w-fit ${statusConfig[order.status].color} border`}>
                          <StatusIcon className="mr-1.5 h-3.5 w-3.5" />
                          {statusConfig[order.status].label}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      {/* Order Items */}
                      <div className="space-y-4">
                        {order.items.map((item, index) => (
                          <div key={`${order.id}-${item.product.id}-${index}`} className="flex gap-4">
                            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-white/10">
                              <Image
                                src={item.product.image}
                                alt={item.product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <Link 
                                href={`/products/${item.product.id}`}
                                className="font-medium text-white hover:text-[#e94560] transition-colors line-clamp-1"
                              >
                                {item.product.name}
                              </Link>
                              <p className="text-sm text-gray-400">
                                Qty: {item.quantity} x ${item.product.price.toFixed(2)}
                              </p>
                            </div>
                            <div className="font-semibold text-white">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </div>
                          </div>
                        ))}
                      </div>

                      <Separator className="my-6 bg-white/10" />

                      {/* Order Summary */}
                      <div className="grid gap-6 sm:grid-cols-2">
                        {/* Shipping Info */}
                        <div>
                          <h4 className="text-sm font-medium text-gray-400 mb-2">Shipping Address</h4>
                          <div className="text-sm text-white space-y-0.5">
                            <p>{order.shippingInfo.name}</p>
                            <p className="text-gray-400">{order.shippingInfo.address}</p>
                            <p className="text-gray-400">
                              {order.shippingInfo.city}, {order.shippingInfo.state} - {order.shippingInfo.pincode}
                            </p>
                            <p className="text-gray-400">{order.shippingInfo.phone}</p>
                          </div>
                        </div>

                        {/* Payment Info */}
                        <div>
                          <h4 className="text-sm font-medium text-gray-400 mb-2">Payment Details</h4>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">Payment ID</span>
                              <span className="font-mono text-xs text-white">{order.razorpayPaymentId}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">Total (USD)</span>
                              <span className="text-white">${order.totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm font-semibold">
                              <span className="text-[#4ecdc4]">Total (INR)</span>
                              <span className="text-[#4ecdc4]">Rs. {order.totalPriceINR.toLocaleString("en-IN")}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
