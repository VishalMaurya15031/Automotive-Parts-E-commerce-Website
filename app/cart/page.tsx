"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, ChevronRight, CreditCard } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/lib/auth-context"

export default function CartPage() {
  const router = useRouter()
  const { items, updateQuantity, removeFromCart, clearCart, totalPrice } = useCart()
  const { isAuthenticated } = useAuth()

  const shipping = totalPrice > 50 ? 0 : 9.99
  const tax = totalPrice * 0.08
  const orderTotal = totalPrice + shipping + tax

  const handleCheckout = () => {
    if (!isAuthenticated) {
      router.push("/login?redirect=/checkout")
      return
    }
    router.push("/checkout")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Shopping Cart</span>
          </nav>

          <h1 className="mb-8 text-3xl font-bold text-foreground">Shopping Cart</h1>

          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16">
              <ShoppingBag className="h-16 w-16 text-muted-foreground" />
              <h2 className="mt-4 text-xl font-semibold text-foreground">
                Your cart is empty
              </h2>
              <p className="mt-2 text-muted-foreground">
                Looks like you haven&apos;t added any items to your cart yet.
              </p>
              <Link href="/products">
                <Button className="mt-6">
                  Start Shopping
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="rounded-lg border border-border bg-card">
                  {items.map((item, index) => (
                    <div key={item.product.id}>
                      <div className="flex gap-4 p-4 sm:p-6">
                        {/* Product Image */}
                        <Link
                          href={`/products/${item.product.id}`}
                          className="shrink-0"
                        >
                          <div className="relative h-24 w-24 overflow-hidden rounded-md bg-muted sm:h-32 sm:w-32">
                            <Image
                              src={item.product.image}
                              alt={item.product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </Link>

                        {/* Product Details */}
                        <div className="flex flex-1 flex-col">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                {item.product.brand}
                              </p>
                              <Link href={`/products/${item.product.id}`}>
                                <h3 className="font-semibold text-foreground hover:text-primary">
                                  {item.product.name}
                                </h3>
                              </Link>
                              <p className="mt-1 text-sm text-muted-foreground">
                                {item.product.subcategory}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeFromCart(item.product.id)}
                              className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Remove</span>
                            </Button>
                          </div>

                          <div className="mt-auto flex items-center justify-between pt-4">
                            {/* Quantity Controls */}
                            <div className="flex items-center rounded-md border border-border">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  updateQuantity(item.product.id, item.quantity - 1)
                                }
                                className="h-8 w-8 rounded-r-none"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-10 text-center text-sm font-medium">
                                {item.quantity}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  updateQuantity(item.product.id, item.quantity + 1)
                                }
                                className="h-8 w-8 rounded-l-none"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>

                            {/* Price */}
                            <span className="font-semibold text-foreground">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                      {index < items.length - 1 && <Separator />}
                    </div>
                  ))}
                </div>

                {/* Clear Cart */}
                <div className="mt-4 flex justify-end">
                  <Button variant="outline" onClick={clearCart}>
                    Clear Cart
                  </Button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 rounded-lg border border-border bg-card p-6">
                  <h2 className="text-lg font-semibold text-foreground">
                    Order Summary
                  </h2>

                  <div className="mt-6 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium text-foreground">
                        ${totalPrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-medium text-foreground">
                        {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax (8%)</span>
                      <span className="font-medium text-foreground">
                        ${tax.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-foreground">Total</span>
                    <span className="text-lg font-bold text-foreground">
                      ${orderTotal.toFixed(2)}
                    </span>
                  </div>

                  {totalPrice < 50 && (
                    <p className="mt-4 text-sm text-muted-foreground">
                      Add ${(50 - totalPrice).toFixed(2)} more for free shipping!
                    </p>
                  )}

                  <Button
                    className="mt-6 w-full"
                    size="lg"
                    onClick={handleCheckout}
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Proceed to Checkout
                  </Button>

                  {!isAuthenticated && (
                    <p className="mt-3 text-center text-sm text-muted-foreground">
                      You&apos;ll need to{" "}
                      <Link href="/login?redirect=/checkout" className="text-primary hover:underline">
                        log in
                      </Link>{" "}
                      to complete your order
                    </p>
                  )}

                  <Link href="/products">
                    <Button variant="outline" className="mt-3 w-full">
                      Continue Shopping
                    </Button>
                  </Link>
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
