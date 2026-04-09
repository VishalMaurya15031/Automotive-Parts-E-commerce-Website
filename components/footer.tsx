import Link from "next/link"
import { Car, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0f0f1a]">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#e94560] to-[#ff6b6b]">
                <Car className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                AutoParts Pro
              </span>
            </Link>
            <p className="text-sm text-gray-400">
              Your trusted source for quality automotive parts. We offer a wide selection of car and bike parts at competitive prices.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <Link
                href="/products?category=car"
                className="text-sm text-gray-400 transition-colors hover:text-[#e94560]"
              >
                Car Parts
              </Link>
              <Link
                href="/products?category=bike"
                className="text-sm text-gray-400 transition-colors hover:text-[#4ecdc4]"
              >
                Bike Parts
              </Link>
              <Link
                href="/cart"
                className="text-sm text-gray-400 transition-colors hover:text-white"
              >
                Shopping Cart
              </Link>
              <Link
                href="/login"
                className="text-sm text-gray-400 transition-colors hover:text-white"
              >
                My Account
              </Link>
            </nav>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Categories</h3>
            <nav className="flex flex-col gap-2">
              <Link
                href="/products?subcategory=Brakes"
                className="text-sm text-gray-400 transition-colors hover:text-white"
              >
                Brakes
              </Link>
              <Link
                href="/products?subcategory=Engine"
                className="text-sm text-gray-400 transition-colors hover:text-white"
              >
                Engine Parts
              </Link>
              <Link
                href="/products?subcategory=Lighting"
                className="text-sm text-gray-400 transition-colors hover:text-white"
              >
                Lighting
              </Link>
              <Link
                href="/products?subcategory=Exhaust"
                className="text-sm text-gray-400 transition-colors hover:text-white"
              >
                Exhaust Systems
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Contact Us</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Mail className="h-4 w-4 text-[#e94560]" />
                support@autopartspro.com
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Phone className="h-4 w-4 text-[#4ecdc4]" />
                +1 (555) 123-4567
              </div>
              <div className="flex items-start gap-2 text-sm text-gray-400">
                <MapPin className="h-4 w-4 mt-0.5 text-[#feca57]" />
                <span>123 Auto Street, Motor City, MC 12345</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-8">
          <p className="text-center text-sm text-gray-500">
            2024 AutoParts Pro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
