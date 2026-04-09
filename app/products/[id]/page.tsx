"use client"

import { use, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  Star,
  ShoppingCart,
  Minus,
  Plus,
  ChevronRight,
  Truck,
  Shield,
  RotateCcw,
  Check,
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/lib/cart-context"
import { getProductById, products } from "@/lib/data"

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = use(params)
  const product = getProductById(id)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const { addToCart } = useCart()

  if (!product) {
    notFound()
  }

  // Get related products (same category, different product)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const incrementQuantity = () => setQuantity((q) => q + 1)
  const decrementQuantity = () => setQuantity((q) => Math.max(1, q - 1))

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
            <Link href="/products" className="hover:text-foreground">
              Products
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link
              href={`/products?category=${product.category}`}
              className="capitalize hover:text-foreground"
            >
              {product.category} Parts
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{product.name}</span>
          </nav>

          {/* Product Details */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden rounded-xl border border-border bg-muted">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              <Badge
                className="absolute left-4 top-4 capitalize"
                variant={product.category === "car" ? "default" : "secondary"}
              >
                {product.category}
              </Badge>
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <div className="mb-1 text-sm font-medium uppercase tracking-wide text-muted-foreground">
                {product.brand}
              </div>
              <h1 className="text-3xl font-bold text-foreground">{product.name}</h1>

              {/* Rating */}
              <div className="mt-3 flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? "fill-primary text-primary"
                          : "fill-muted text-muted"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-medium">{product.rating}</span>
                <span className="text-muted-foreground">
                  ({product.reviews} reviews)
                </span>
              </div>

              {/* Category */}
              <div className="mt-3">
                <Badge variant="outline">{product.subcategory}</Badge>
              </div>

              {/* Price */}
              <div className="mt-6">
                <span className="text-4xl font-bold text-foreground">
                  ${product.price.toFixed(2)}
                </span>
              </div>

              {/* Stock Status */}
              <div className="mt-4">
                {product.inStock ? (
                  <div className="flex items-center gap-2 text-accent">
                    <Check className="h-5 w-5" />
                    <span className="font-medium">In Stock</span>
                  </div>
                ) : (
                  <span className="font-medium text-destructive">Out of Stock</span>
                )}
              </div>

              <Separator className="my-6" />

              {/* Description */}
              <div>
                <h3 className="font-semibold text-foreground">Description</h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

              <Separator className="my-6" />

              {/* Quantity and Add to Cart */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-foreground">Quantity:</span>
                  <div className="flex items-center rounded-md border border-border">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                      className="h-10 w-10 rounded-r-none"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={incrementQuantity}
                      className="h-10 w-10 rounded-l-none"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Button
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 sm:flex-none"
                >
                  {added ? (
                    <>
                      <Check className="mr-2 h-5 w-5" />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Add to Cart
                    </>
                  )}
                </Button>
              </div>

              {/* Features */}
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="flex items-start gap-3 rounded-lg border border-border p-4">
                  <Truck className="h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Free Shipping</p>
                    <p className="text-xs text-muted-foreground">On orders over $50</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-lg border border-border p-4">
                  <Shield className="h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Warranty</p>
                    <p className="text-xs text-muted-foreground">1 year manufacturer</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-lg border border-border p-4">
                  <RotateCcw className="h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Easy Returns</p>
                    <p className="text-xs text-muted-foreground">30-day return policy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-16">
              <h2 className="mb-6 text-2xl font-bold text-foreground">
                Related Products
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {relatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
