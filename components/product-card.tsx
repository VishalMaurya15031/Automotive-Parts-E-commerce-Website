"use client"

import Image from "next/image"
import Link from "next/link"
import { Star, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart-context"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()

  return (
    <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {!product.inStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80">
              <Badge variant="secondary" className="text-sm">
                Out of Stock
              </Badge>
            </div>
          )}
          <Badge
            className="absolute left-3 top-3 capitalize"
            variant={product.category === "car" ? "default" : "secondary"}
          >
            {product.category}
          </Badge>
        </div>
      </Link>
      <CardContent className="p-4">
        <div className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {product.brand}
        </div>
        <Link href={`/products/${product.id}`}>
          <h3 className="line-clamp-2 font-semibold text-foreground transition-colors hover:text-primary">
            {product.name}
          </h3>
        </Link>
        <div className="mt-2 flex items-center gap-1">
          <Star className="h-4 w-4 fill-primary text-primary" />
          <span className="text-sm font-medium">{product.rating}</span>
          <span className="text-sm text-muted-foreground">
            ({product.reviews} reviews)
          </span>
        </div>
        <div className="mt-2 text-xs text-muted-foreground">
          {product.subcategory}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t border-border p-4">
        <span className="text-lg font-bold text-foreground">
          ${product.price.toFixed(2)}
        </span>
        <Button
          size="sm"
          onClick={() => addToCart(product)}
          disabled={!product.inStock}
        >
          <ShoppingCart className="mr-1.5 h-4 w-4" />
          Add
        </Button>
      </CardFooter>
    </Card>
  )
}
