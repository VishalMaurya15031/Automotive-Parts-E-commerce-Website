"use client"

import Link from "next/link"
import { useState } from "react"
import { ShoppingCart, User, Menu, X, Search, Car, Bike } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/lib/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { totalItems } = useCart()
  const { user, isAuthenticated, isAdmin, logout } = useAuth()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#1a1a2e]/95 backdrop-blur supports-[backdrop-filter]:bg-[#1a1a2e]/80">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-[#e94560] to-[#ff6b6b]">
              <Car className="h-5 w-5 text-white" />
            </div>
            <span className="hidden text-xl font-bold text-white sm:block">
              AutoParts Pro
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="/products?category=car"
              className="flex items-center gap-1.5 text-sm font-medium text-gray-300 transition-colors hover:text-white"
            >
              <Car className="h-4 w-4" />
              Car Parts
            </Link>
            <Link
              href="/products?category=bike"
              className="flex items-center gap-1.5 text-sm font-medium text-gray-300 transition-colors hover:text-white"
            >
              <Bike className="h-4 w-4" />
              Bike Parts
            </Link>
          </nav>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden flex-1 max-w-md lg:flex">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="Search parts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-[#e94560]"
              />
            </div>
          </form>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative text-gray-300 hover:text-white hover:bg-white/10">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-[#e94560] to-[#ff6b6b] text-xs font-medium text-white">
                    {totalItems}
                  </span>
                )}
                <span className="sr-only">Cart ({totalItems} items)</span>
              </Button>
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-white/10">
                    <User className="h-5 w-5" />
                    <span className="sr-only">User menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-[#1a1a2e] border-white/10">
                  <div className="px-2 py-1.5 text-sm font-medium text-white">
                    {user?.name}
                  </div>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem asChild className="text-gray-300 focus:text-white focus:bg-white/10">
                    <Link href="/orders">My Orders</Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <>
                      <DropdownMenuItem asChild className="text-gray-300 focus:text-white focus:bg-white/10">
                        <Link href="/admin">Admin Dashboard</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem onClick={logout} className="text-gray-300 focus:text-white focus:bg-white/10">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-white/10">
                  Login
                </Button>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-gray-300 hover:text-white hover:bg-white/10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-white/10 py-4 md:hidden">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search parts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
              </div>
            </form>
            <nav className="flex flex-col gap-2">
              <Link
                href="/products?category=car"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Car className="h-4 w-4" />
                Car Parts
              </Link>
              <Link
                href="/products?category=bike"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Bike className="h-4 w-4" />
                Bike Parts
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
