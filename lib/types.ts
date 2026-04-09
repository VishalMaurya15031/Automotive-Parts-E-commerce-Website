export interface Product {
  id: string
  name: string
  price: number
  description: string
  image: string
  category: "car" | "bike"
  subcategory: string
  brand: string
  inStock: boolean
  rating: number
  reviews: number
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface User {
  id: string
  name: string
  email: string
  role: "user" | "admin"
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  totalPrice: number
  status: "pending" | "processing" | "shipped" | "delivered"
  orderDate: string
}
