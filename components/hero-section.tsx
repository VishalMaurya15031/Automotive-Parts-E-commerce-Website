import Link from "next/link"
import { ArrowRight, Car, Bike, Shield, Truck, HeadphonesIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-[#e94560]/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-[#ff6b6b]/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-[#4ecdc4]/10 blur-3xl" />
      </div>
      
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:py-28">
        <div className="text-center">
          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="font-serif text-white">Quality Auto Parts for </span>
            <span className="font-serif italic bg-gradient-to-r from-[#ff6b6b] to-[#feca57] bg-clip-text text-transparent">Cars & Bikes</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-gray-300">
            Find the perfect parts for your vehicle. We offer a wide selection of high-quality automotive parts at competitive prices with fast shipping.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/products?category=car">
              <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-[#e94560] to-[#ff6b6b] hover:from-[#d63d56] hover:to-[#e85f5f] text-white px-8 shadow-lg shadow-[#e94560]/30">
                <Car className="mr-2 h-5 w-5" />
                Shop Car Parts
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/products?category=bike">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/30 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8">
                <Bike className="mr-2 h-5 w-5" />
                Shop Bike Parts
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          <div className="flex flex-col items-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 text-center transition-all hover:bg-white/10 hover:border-white/20">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#4ecdc4] to-[#44a08d]">
              <Truck className="h-6 w-6 text-white" />
            </div>
            <h3 className="mt-4 font-semibold text-white">Fast Shipping</h3>
            <p className="mt-2 text-sm text-gray-400">
              Free shipping on orders over $50. Most items ship within 24 hours.
            </p>
          </div>
          <div className="flex flex-col items-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 text-center transition-all hover:bg-white/10 hover:border-white/20">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#feca57] to-[#f9a826]">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h3 className="mt-4 font-semibold text-white">Quality Guaranteed</h3>
            <p className="mt-2 text-sm text-gray-400">
              All parts are OEM quality or better with manufacturer warranty.
            </p>
          </div>
          <div className="flex flex-col items-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 text-center transition-all hover:bg-white/10 hover:border-white/20">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#e94560] to-[#ff6b6b]">
              <HeadphonesIcon className="h-6 w-6 text-white" />
            </div>
            <h3 className="mt-4 font-semibold text-white">Expert Support</h3>
            <p className="mt-2 text-sm text-gray-400">
              Our team of automotive experts is here to help you find the right parts.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
