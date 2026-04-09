import type { Product } from "./types"

export const products: Product[] = [
  // Car Parts
  {
    id: "car-1",
    name: "Performance Brake Pads",
    price: 89.99,
    description: "High-performance ceramic brake pads for superior stopping power. Compatible with most sedan and SUV models. Features advanced heat dissipation technology for consistent performance.",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=400&fit=crop",
    category: "car",
    subcategory: "Brakes",
    brand: "StopTech",
    inStock: true,
    rating: 4.8,
    reviews: 124
  },
  {
    id: "car-2",
    name: "LED Headlight Kit",
    price: 159.99,
    description: "Ultra-bright LED headlight conversion kit with 6000K white light. Easy plug-and-play installation. Includes 2 bulbs with built-in cooling fans.",
    image: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=400&h=400&fit=crop",
    category: "car",
    subcategory: "Lighting",
    brand: "LumiDrive",
    inStock: true,
    rating: 4.6,
    reviews: 89
  },
  {
    id: "car-3",
    name: "Synthetic Motor Oil 5W-30",
    price: 42.99,
    description: "Premium full synthetic motor oil for maximum engine protection. 5-quart container. Excellent cold-start performance and fuel economy.",
    image: "https://images.unsplash.com/photo-1635784063582-d180da7b744a?w=400&h=400&fit=crop",
    category: "car",
    subcategory: "Engine",
    brand: "Mobil",
    inStock: true,
    rating: 4.9,
    reviews: 256
  },
  {
    id: "car-4",
    name: "Air Filter Performance",
    price: 34.99,
    description: "Washable and reusable high-flow air filter. Increases horsepower and acceleration. Lasts up to 50,000 miles between cleanings.",
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&h=400&fit=crop",
    category: "car",
    subcategory: "Engine",
    brand: "K&N",
    inStock: true,
    rating: 4.7,
    reviews: 178
  },
  {
    id: "car-5",
    name: "Alloy Wheel Set 17\"",
    price: 599.99,
    description: "Set of 4 premium alloy wheels with sleek spoke design. Lightweight construction for improved handling. Includes center caps and lug nuts.",
    image: "https://images.unsplash.com/photo-1611821064430-0d40291d0f0b?w=400&h=400&fit=crop",
    category: "car",
    subcategory: "Wheels",
    brand: "Enkei",
    inStock: true,
    rating: 4.5,
    reviews: 67
  },
  {
    id: "car-6",
    name: "Car Battery 12V",
    price: 129.99,
    description: "Heavy-duty 12V car battery with 700 cold cranking amps. Maintenance-free design with 3-year warranty. Fits most vehicles.",
    image: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=400&h=400&fit=crop",
    category: "car",
    subcategory: "Electrical",
    brand: "Optima",
    inStock: false,
    rating: 4.8,
    reviews: 312
  },
  // Bike Parts
  {
    id: "bike-1",
    name: "Motorcycle Chain Kit",
    price: 79.99,
    description: "Complete chain and sprocket kit for sport bikes. High-strength steel construction with gold finish. Includes front and rear sprockets.",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=400&h=400&fit=crop",
    category: "bike",
    subcategory: "Drivetrain",
    brand: "DID",
    inStock: true,
    rating: 4.7,
    reviews: 93
  },
  {
    id: "bike-2",
    name: "Sport Exhaust System",
    price: 349.99,
    description: "Full titanium exhaust system with carbon fiber end cap. Adds 5-8 horsepower with aggressive sound. Includes all mounting hardware.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    category: "bike",
    subcategory: "Exhaust",
    brand: "Akrapovic",
    inStock: true,
    rating: 4.9,
    reviews: 156
  },
  {
    id: "bike-3",
    name: "Motorcycle Brake Disc",
    price: 119.99,
    description: "Floating front brake disc for improved cooling and braking performance. Stainless steel construction with precision drilling.",
    image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=400&h=400&fit=crop",
    category: "bike",
    subcategory: "Brakes",
    brand: "Brembo",
    inStock: true,
    rating: 4.8,
    reviews: 78
  },
  {
    id: "bike-4",
    name: "LED Tail Light Kit",
    price: 59.99,
    description: "Integrated LED tail light with sequential turn signals. Smoked lens design with bright visibility. Easy installation.",
    image: "https://images.unsplash.com/photo-1558980394-4c7c9299fe96?w=400&h=400&fit=crop",
    category: "bike",
    subcategory: "Lighting",
    brand: "TST",
    inStock: true,
    rating: 4.5,
    reviews: 134
  },
  {
    id: "bike-5",
    name: "Handlebar Grips",
    price: 29.99,
    description: "Premium rubber handlebar grips with ergonomic design. Reduces vibration and improves comfort. Available in multiple colors.",
    image: "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?w=400&h=400&fit=crop",
    category: "bike",
    subcategory: "Controls",
    brand: "ProGrip",
    inStock: true,
    rating: 4.4,
    reviews: 203
  },
  {
    id: "bike-6",
    name: "Motorcycle Oil Filter",
    price: 14.99,
    description: "High-flow oil filter for motorcycles. Premium filtration media removes contaminants. Easy spin-on installation.",
    image: "https://images.unsplash.com/photo-1600712242805-5f78671b24da?w=400&h=400&fit=crop",
    category: "bike",
    subcategory: "Engine",
    brand: "HiFlo",
    inStock: true,
    rating: 4.6,
    reviews: 445
  }
]

export const categories = {
  car: ["Brakes", "Lighting", "Engine", "Wheels", "Electrical", "Suspension", "Interior"],
  bike: ["Drivetrain", "Exhaust", "Brakes", "Lighting", "Controls", "Engine", "Body"]
}

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id)
}

export function getProductsByCategory(category: "car" | "bike"): Product[] {
  return products.filter(p => p.category === category)
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.rating >= 4.7).slice(0, 4)
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase()
  return products.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.brand.toLowerCase().includes(lowerQuery) ||
    p.subcategory.toLowerCase().includes(lowerQuery)
  )
}
