"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import type { Order, CartItem } from "./types"

interface OrderContextType {
  orders: Order[]
  addOrder: (order: Omit<Order, "id" | "orderDate" | "status">) => Order
  getOrdersByUserId: (userId: string) => Order[]
  getOrderById: (orderId: string) => Order | undefined
  updateOrderStatus: (orderId: string, status: Order["status"]) => void
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([])

  const addOrder = useCallback((orderData: Omit<Order, "id" | "orderDate" | "status">): Order => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${Date.now()}`,
      orderDate: new Date().toISOString(),
      status: "confirmed",
    }
    
    setOrders(prev => [newOrder, ...prev])
    return newOrder
  }, [])

  const getOrdersByUserId = useCallback((userId: string): Order[] => {
    return orders.filter(order => order.userId === userId)
  }, [orders])

  const getOrderById = useCallback((orderId: string): Order | undefined => {
    return orders.find(order => order.id === orderId || order.razorpayOrderId === orderId)
  }, [orders])

  const updateOrderStatus = useCallback((orderId: string, status: Order["status"]) => {
    setOrders(prev => 
      prev.map(order => 
        order.id === orderId ? { ...order, status } : order
      )
    )
  }, [])

  return (
    <OrderContext.Provider
      value={{
        orders,
        addOrder,
        getOrdersByUserId,
        getOrderById,
        updateOrderStatus,
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

export function useOrders() {
  const context = useContext(OrderContext)
  if (!context) {
    throw new Error("useOrders must be used within an OrderProvider")
  }
  return context
}
