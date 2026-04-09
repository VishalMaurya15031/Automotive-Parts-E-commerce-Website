"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  Car,
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  LogOut,
  Home,
  Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/lib/auth-context"
import { products as initialProducts, categories } from "@/lib/data"
import type { Product } from "@/lib/types"

// Mock orders data
const mockOrders = [
  { id: "ORD-001", customer: "John Doe", total: 249.97, status: "delivered", date: "2024-01-15" },
  { id: "ORD-002", customer: "Jane Smith", total: 159.99, status: "shipped", date: "2024-01-14" },
  { id: "ORD-003", customer: "Bob Johnson", total: 89.99, status: "processing", date: "2024-01-13" },
  { id: "ORD-004", customer: "Alice Brown", total: 449.98, status: "pending", date: "2024-01-12" },
]

export default function AdminDashboard() {
  const router = useRouter()
  const { user, isAdmin, logout } = useAuth()
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [searchQuery, setSearchQuery] = useState("")
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  // New product form state
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    category: "car" as "car" | "bike",
    subcategory: "",
    brand: "",
  })

  useEffect(() => {
    if (!isAdmin) {
      router.push("/login")
    }
  }, [isAdmin, router])

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Checking authorization...</p>
      </div>
    )
  }

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const stats = {
    totalProducts: products.length,
    totalOrders: mockOrders.length,
    totalRevenue: mockOrders.reduce((sum, o) => sum + o.total, 0),
    totalCustomers: 156,
  }

  const handleAddProduct = () => {
    const product: Product = {
      id: `prod-${Date.now()}`,
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      description: newProduct.description,
      image: "/placeholder.svg?height=400&width=400",
      category: newProduct.category,
      subcategory: newProduct.subcategory,
      brand: newProduct.brand,
      inStock: true,
      rating: 4.5,
      reviews: 0,
    }
    setProducts([...products, product])
    setNewProduct({
      name: "",
      price: "",
      description: "",
      category: "car",
      subcategory: "",
      brand: "",
    })
    setIsAddDialogOpen(false)
  }

  const handleUpdateProduct = () => {
    if (!editingProduct) return
    setProducts(products.map((p) => (p.id === editingProduct.id ? editingProduct : p)))
    setEditingProduct(null)
  }

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-accent/20 text-accent"
      case "shipped":
        return "bg-chart-2/20 text-chart-2"
      case "processing":
        return "bg-chart-4/20 text-chart-4"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-sidebar-border bg-sidebar">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
              <Car className="h-4 w-4 text-sidebar-primary-foreground" />
            </div>
            <span className="font-bold text-sidebar-foreground">Admin Panel</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            <div className="rounded-md bg-sidebar-accent px-3 py-2 text-sm font-medium text-sidebar-accent-foreground">
              <Package className="mr-2 inline-block h-4 w-4" />
              Products
            </div>
            <div className="px-3 py-2 text-sm text-sidebar-foreground/70">
              <ShoppingCart className="mr-2 inline-block h-4 w-4" />
              Orders
            </div>
            <div className="px-3 py-2 text-sm text-sidebar-foreground/70">
              <Users className="mr-2 inline-block h-4 w-4" />
              Customers
            </div>
          </nav>

          {/* User Info */}
          <div className="border-t border-sidebar-border p-4">
            <div className="mb-2 text-sm text-sidebar-foreground">{user?.name}</div>
            <div className="flex gap-2">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-sidebar-foreground/70">
                  <Home className="mr-1 h-4 w-4" />
                  Store
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="text-sidebar-foreground/70"
              >
                <LogOut className="mr-1 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.name}</p>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Products
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProducts}</div>
              <p className="text-xs text-muted-foreground">Active in store</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Orders
              </CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</div>
              <p className="flex items-center text-xs text-accent">
                <TrendingUp className="mr-1 h-3 w-3" />
                +12% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Customers
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCustomers}</div>
              <p className="text-xs text-muted-foreground">Registered users</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>${order.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge className={`capitalize ${getStatusColor(order.status)}`}>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{order.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Products Management */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Products</CardTitle>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-10"
                />
              </div>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Product
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Product Name</Label>
                      <Input
                        id="name"
                        value={newProduct.name}
                        onChange={(e) =>
                          setNewProduct({ ...newProduct, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="price">Price</Label>
                        <Input
                          id="price"
                          type="number"
                          value={newProduct.price}
                          onChange={(e) =>
                            setNewProduct({ ...newProduct, price: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="brand">Brand</Label>
                        <Input
                          id="brand"
                          value={newProduct.brand}
                          onChange={(e) =>
                            setNewProduct({ ...newProduct, brand: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={newProduct.category}
                          onValueChange={(value: "car" | "bike") =>
                            setNewProduct({ ...newProduct, category: value, subcategory: "" })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="car">Car</SelectItem>
                            <SelectItem value="bike">Bike</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subcategory">Subcategory</Label>
                        <Select
                          value={newProduct.subcategory}
                          onValueChange={(value) =>
                            setNewProduct({ ...newProduct, subcategory: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                          <SelectContent>
                            {categories[newProduct.category].map((sub) => (
                              <SelectItem key={sub} value={sub}>
                                {sub}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={newProduct.description}
                        onChange={(e) =>
                          setNewProduct({ ...newProduct, description: e.target.value })
                        }
                        rows={3}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleAddProduct}>Add Product</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 overflow-hidden rounded bg-muted">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {product.brand}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="capitalize">
                      <Badge variant="outline">{product.category}</Badge>
                    </TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge variant={product.inStock ? "default" : "secondary"}>
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setEditingProduct({ ...product })}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Product</DialogTitle>
                            </DialogHeader>
                            {editingProduct && (
                              <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                  <Label>Product Name</Label>
                                  <Input
                                    value={editingProduct.name}
                                    onChange={(e) =>
                                      setEditingProduct({
                                        ...editingProduct,
                                        name: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label>Price</Label>
                                    <Input
                                      type="number"
                                      value={editingProduct.price}
                                      onChange={(e) =>
                                        setEditingProduct({
                                          ...editingProduct,
                                          price: parseFloat(e.target.value),
                                        })
                                      }
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Brand</Label>
                                    <Input
                                      value={editingProduct.brand}
                                      onChange={(e) =>
                                        setEditingProduct({
                                          ...editingProduct,
                                          brand: e.target.value,
                                        })
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <Label>Description</Label>
                                  <Textarea
                                    value={editingProduct.description}
                                    onChange={(e) =>
                                      setEditingProduct({
                                        ...editingProduct,
                                        description: e.target.value,
                                      })
                                    }
                                    rows={3}
                                  />
                                </div>
                              </div>
                            )}
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                              </DialogClose>
                              <DialogClose asChild>
                                <Button onClick={handleUpdateProduct}>
                                  Save Changes
                                </Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
