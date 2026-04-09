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
        <section className="mx-auto max-w-7xl px-4 py-16">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                Featured Products
              </h2>
              <p className="mt-1 text-muted-foreground">
                Top-rated parts loved by our customers
              </p>
            </div>
            <Link href="/products">
              <Button variant="ghost">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Category Section */}
        <section className="bg-muted/30 py-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                Shop by Category
              </h2>
              <p className="mt-1 text-muted-foreground">
                Find parts for your vehicle type
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Car Category */}
              <Link
                href="/products?category=car"
                className="group relative overflow-hidden rounded-xl border border-border bg-card p-8 transition-shadow hover:shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary">
                      <Car className="h-7 w-7 text-primary-foreground" />
                    </div>
                    <h3 className="mt-4 text-xl font-bold text-foreground">
                      Car Parts
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                      Brakes, engine parts, lighting, wheels, and more for your car.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {categories.car.slice(0, 4).map((cat) => (
                        <span
                          key={cat}
                          className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </div>
              </Link>

              {/* Bike Category */}
              <Link
                href="/products?category=bike"
                className="group relative overflow-hidden rounded-xl border border-border bg-card p-8 transition-shadow hover:shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-accent">
                      <Bike className="h-7 w-7 text-accent-foreground" />
                    </div>
                    <h3 className="mt-4 text-xl font-bold text-foreground">
                      Bike Parts
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                      Chains, exhaust, brakes, controls, and more for your motorcycle.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {categories.bike.slice(0, 4).map((cat) => (
                        <span
                          key={cat}
                          className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mx-auto max-w-7xl px-4 py-16">
          <div className="rounded-2xl bg-primary p-8 text-center sm:p-12">
            <h2 className="text-2xl font-bold text-primary-foreground sm:text-3xl">
              Ready to upgrade your ride?
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-primary-foreground/80">
              Join thousands of satisfied customers who trust AutoParts Pro for their automotive needs.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/products">
                <Button size="lg" variant="secondary">
                  Browse All Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
