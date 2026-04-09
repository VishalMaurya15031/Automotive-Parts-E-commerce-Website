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
  avatar?: string
}

export interface Order {
  id: string
  razorpayOrderId: string
  razorpayPaymentId: string
  userId: string
  items: CartItem[]
  totalPrice: number
  totalPriceINR: number
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered"
  orderDate: string
  shippingInfo: {
    name: string
    email: string
    phone: string
    address: string
    city: string
    state: string
    pincode: string
  }
}
