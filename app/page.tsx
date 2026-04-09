import Link from "next/link"
import { ArrowRight, Car, Bike } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { getFeaturedProducts, categories } from "@/lib/data"

export default function HomePage() {
  const featuredProducts = getFeaturedProducts()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />

        {/* Featured Products */}
        <section className="relative mx-auto max-w-7xl px-4 py-16">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 right-10 h-64 w-64 rounded-full bg-[#4ecdc4]/10 blur-3xl" />
          </div>
          <div className="relative mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Featured Products
              </h2>
              <p className="mt-1 text-gray-400">
                Top-rated parts loved by our customers
              </p>
            </div>
            <Link href="/products">
              <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/10">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Category Section */}
        <section className="relative py-16">
          <div className="absolute inset-0 bg-gradient-to-r from-[#e94560]/5 via-transparent to-[#4ecdc4]/5" />
          <div className="relative mx-auto max-w-7xl px-4">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Shop by Category
              </h2>
              <p className="mt-1 text-gray-400">
                Find parts for your vehicle type
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Car Category */}
              <Link
                href="/products?category=car"
                className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 transition-all hover:bg-white/10 hover:border-[#e94560]/50"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#e94560]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex items-start justify-between">
                  <div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-[#e94560] to-[#ff6b6b]">
                      <Car className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="mt-4 text-xl font-bold text-white">
                      Car Parts
                    </h3>
                    <p className="mt-2 text-gray-400">
                      Brakes, engine parts, lighting, wheels, and more for your car.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {categories.car.slice(0, 4).map((cat) => (
                        <span
                          key={cat}
                          className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-gray-300"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-[#e94560]" />
                </div>
              </Link>

              {/* Bike Category */}
              <Link
                href="/products?category=bike"
                className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 transition-all hover:bg-white/10 hover:border-[#4ecdc4]/50"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#4ecdc4]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex items-start justify-between">
                  <div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-[#4ecdc4] to-[#44a08d]">
                      <Bike className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="mt-4 text-xl font-bold text-white">
                      Bike Parts
                    </h3>
                    <p className="mt-2 text-gray-400">
                      Chains, exhaust, brakes, controls, and more for your motorcycle.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {categories.bike.slice(0, 4).map((cat) => (
                        <span
                          key={cat}
                          className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-gray-300"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-[#4ecdc4]" />
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mx-auto max-w-7xl px-4 py-16">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#e94560] via-[#ff6b6b] to-[#feca57] p-8 text-center sm:p-12">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.1%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30" />
            <div className="relative">
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Ready to upgrade your ride?
              </h2>
              <p className="mx-auto mt-2 max-w-xl text-white/90">
                Join thousands of satisfied customers who trust AutoParts Pro for their automotive needs.
              </p>
              <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/products">
                  <Button size="lg" className="bg-white text-[#e94560] hover:bg-gray-100">
                    Browse All Products
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="lg" variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20">
                    Create Account
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
