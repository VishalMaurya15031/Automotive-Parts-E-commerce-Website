import Link from "next/link"
import { ArrowRight, Car, Bike, Shield, Truck, HeadphonesIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-muted/50 to-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:py-24">
        <div className="text-center">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Quality Auto Parts for{" "}
            <span className="text-primary">Cars & Bikes</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">
            Find the perfect parts for your vehicle. We offer a wide selection of high-quality automotive parts at competitive prices with fast shipping.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/products?category=car">
              <Button size="lg" className="w-full sm:w-auto">
                <Car className="mr-2 h-5 w-5" />
                Shop Car Parts
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/products?category=bike">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                <Bike className="mr-2 h-5 w-5" />
                Shop Bike Parts
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          <div className="flex flex-col items-center rounded-lg border border-border bg-card p-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Truck className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mt-4 font-semibold text-foreground">Fast Shipping</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Free shipping on orders over $50. Most items ship within 24 hours.
            </p>
          </div>
          <div className="flex flex-col items-center rounded-lg border border-border bg-card p-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mt-4 font-semibold text-foreground">Quality Guaranteed</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              All parts are OEM quality or better with manufacturer warranty.
            </p>
          </div>
          <div className="flex flex-col items-center rounded-lg border border-border bg-card p-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <HeadphonesIcon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mt-4 font-semibold text-foreground">Expert Support</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Our team of automotive experts is here to help you find the right parts.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
