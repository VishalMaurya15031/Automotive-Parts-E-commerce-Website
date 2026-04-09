import Link from "next/link"
import { ArrowRight, Car, Bike, Shield, Truck, HeadphonesIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#f5f5f5]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:py-24">
        <div className="text-center">
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="font-serif text-foreground">Quality Auto Parts for </span>
            <span className="font-serif italic text-[#b91c1c]">Cars & Bikes</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">
            Find the perfect parts for your vehicle. We offer a wide selection of high-quality automotive parts at competitive prices with fast shipping.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/products?category=car">
              <Button size="lg" className="w-full sm:w-auto bg-[#b91c1c] hover:bg-[#991b1b] text-white px-8">
                <Car className="mr-2 h-5 w-5" />
                Shop Car Parts
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/products?category=bike">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-gray-300 bg-white hover:bg-gray-50 text-foreground px-8">
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
