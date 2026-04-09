import Link from "next/link"
import { Car, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Car className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">
                AutoParts Pro
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your trusted source for quality automotive parts. We offer a wide selection of car and bike parts at competitive prices.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <Link
                href="/products?category=car"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Car Parts
              </Link>
              <Link
                href="/products?category=bike"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Bike Parts
              </Link>
              <Link
                href="/cart"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Shopping Cart
              </Link>
              <Link
                href="/login"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                My Account
              </Link>
            </nav>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Categories</h3>
            <nav className="flex flex-col gap-2">
              <Link
                href="/products?subcategory=Brakes"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Brakes
              </Link>
              <Link
                href="/products?subcategory=Engine"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Engine Parts
              </Link>
              <Link
                href="/products?subcategory=Lighting"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Lighting
              </Link>
              <Link
                href="/products?subcategory=Exhaust"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Exhaust Systems
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Contact Us</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                support@autopartspro.com
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                +1 (555) 123-4567
              </div>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>123 Auto Street, Motor City, MC 12345</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            2024 AutoParts Pro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
