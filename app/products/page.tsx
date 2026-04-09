"use client"

import { useSearchParams } from "next/navigation"
import { useState, useMemo, Suspense } from "react"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { products, categories } from "@/lib/data"

function ProductsContent() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get("category") as "car" | "bike" | null
  const initialSearch = searchParams.get("search") || ""
  const initialSubcategory = searchParams.get("subcategory") || ""

  const [searchQuery, setSearchQuery] = useState(initialSearch)
  const [selectedCategory, setSelectedCategory] = useState<"car" | "bike" | "all">(
    initialCategory || "all"
  )
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(
    initialSubcategory ? [initialSubcategory] : []
  )
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("featured")
  const [inStockOnly, setInStockOnly] = useState(false)

  // Get unique brands from products
  const allBrands = useMemo(() => {
    const brands = new Set(products.map((p) => p.brand))
    return Array.from(brands).sort()
  }, [])

  // Get subcategories based on selected category
  const availableSubcategories = useMemo(() => {
    if (selectedCategory === "all") {
      return [...categories.car, ...categories.bike].filter(
        (v, i, a) => a.indexOf(v) === i
      )
    }
    return categories[selectedCategory]
  }, [selectedCategory])

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products]

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory)
    }

    // Filter by subcategory
    if (selectedSubcategories.length > 0) {
      result = result.filter((p) => selectedSubcategories.includes(p.subcategory))
    }

    // Filter by brand
    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand))
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query)
      )
    }

    // Filter by stock
    if (inStockOnly) {
      result = result.filter((p) => p.inStock)
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        result.sort((a, b) => b.price - a.price)
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        // Featured - sort by rating and reviews
        result.sort((a, b) => b.rating * b.reviews - a.rating * a.reviews)
    }

    return result
  }, [
    selectedCategory,
    selectedSubcategories,
    selectedBrands,
    searchQuery,
    inStockOnly,
    sortBy,
  ])

  const clearFilters = () => {
    setSelectedCategory("all")
    setSelectedSubcategories([])
    setSelectedBrands([])
    setSearchQuery("")
    setInStockOnly(false)
  }

  const activeFilterCount =
    (selectedCategory !== "all" ? 1 : 0) +
    selectedSubcategories.length +
    selectedBrands.length +
    (inStockOnly ? 1 : 0)

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Category */}
      <div>
        <h4 className="mb-3 font-semibold text-foreground">Category</h4>
        <div className="flex flex-wrap gap-2">
          {(["all", "car", "bike"] as const).map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setSelectedCategory(cat)
                setSelectedSubcategories([])
              }}
              className="capitalize"
            >
              {cat === "all" ? "All" : cat}
            </Button>
          ))}
        </div>
      </div>

      {/* Subcategory */}
      <div>
        <h4 className="mb-3 font-semibold text-foreground">Type</h4>
        <div className="space-y-2">
          {availableSubcategories.map((sub) => (
            <div key={sub} className="flex items-center gap-2">
              <Checkbox
                id={`sub-${sub}`}
                checked={selectedSubcategories.includes(sub)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedSubcategories([...selectedSubcategories, sub])
                  } else {
                    setSelectedSubcategories(
                      selectedSubcategories.filter((s) => s !== sub)
                    )
                  }
                }}
              />
              <Label htmlFor={`sub-${sub}`} className="text-sm cursor-pointer">
                {sub}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Brand */}
      <div>
        <h4 className="mb-3 font-semibold text-foreground">Brand</h4>
        <div className="space-y-2">
          {allBrands.map((brand) => (
            <div key={brand} className="flex items-center gap-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedBrands([...selectedBrands, brand])
                  } else {
                    setSelectedBrands(selectedBrands.filter((b) => b !== brand))
                  }
                }}
              />
              <Label htmlFor={`brand-${brand}`} className="text-sm cursor-pointer">
                {brand}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* In Stock */}
      <div className="flex items-center gap-2">
        <Checkbox
          id="in-stock"
          checked={inStockOnly}
          onCheckedChange={(checked) => setInStockOnly(checked as boolean)}
        />
        <Label htmlFor="in-stock" className="text-sm cursor-pointer">
          In Stock Only
        </Label>
      </div>

      {/* Clear Filters */}
      {activeFilterCount > 0 && (
        <Button variant="outline" onClick={clearFilters} className="w-full">
          Clear All Filters
        </Button>
      )}
    </div>
  )

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">
              {selectedCategory === "all"
                ? "All Products"
                : selectedCategory === "car"
                ? "Car Parts"
                : "Bike Parts"}
            </h1>
            <p className="mt-1 text-muted-foreground">
              {filteredProducts.length} products found
            </p>
          </div>

          {/* Search and Sort Bar */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-3">
              {/* Mobile Filter Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden">
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    Filters
                    {activeFilterCount > 0 && (
                      <Badge variant="secondary" className="ml-2">
                        {activeFilterCount}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active Filters */}
          {(selectedSubcategories.length > 0 ||
            selectedBrands.length > 0 ||
            inStockOnly) && (
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {selectedSubcategories.map((sub) => (
                <Badge key={sub} variant="secondary" className="gap-1">
                  {sub}
                  <button
                    onClick={() =>
                      setSelectedSubcategories(
                        selectedSubcategories.filter((s) => s !== sub)
                      )
                    }
                    className="ml-1 hover:text-foreground"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              {selectedBrands.map((brand) => (
                <Badge key={brand} variant="secondary" className="gap-1">
                  {brand}
                  <button
                    onClick={() =>
                      setSelectedBrands(selectedBrands.filter((b) => b !== brand))
                    }
                    className="ml-1 hover:text-foreground"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              {inStockOnly && (
                <Badge variant="secondary" className="gap-1">
                  In Stock
                  <button
                    onClick={() => setInStockOnly(false)}
                    className="ml-1 hover:text-foreground"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
            </div>
          )}

          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden w-64 shrink-0 lg:block">
              <div className="sticky top-24 rounded-lg border border-border bg-card p-6">
                <h3 className="mb-4 font-semibold text-foreground">Filters</h3>
                <FilterContent />
              </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
              {filteredProducts.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16">
                  <p className="text-lg font-medium text-foreground">
                    No products found
                  </p>
                  <p className="mt-1 text-muted-foreground">
                    Try adjusting your filters or search query
                  </p>
                  <Button variant="outline" onClick={clearFilters} className="mt-4">
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <ProductsContent />
    </Suspense>
  )
}
