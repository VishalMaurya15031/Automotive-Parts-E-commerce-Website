"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import type { User } from "./types"

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users for demo purposes
const mockUsers: (User & { password: string })[] = [
  { id: "1", name: "Admin User", email: "admin@autoparts.com", role: "admin", password: "admin123" },
  { id: "2", name: "John Doe", email: "john@example.com", role: "user", password: "user123" }
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    const foundUser = mockUsers.find(u => u.email === email && u.password === password)
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      return true
    }
    return false
  }, [])

  const signup = useCallback(async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Check if user already exists
    if (mockUsers.some(u => u.email === email)) {
      return false
    }
    
    // Create new user (in real app, this would be saved to database)
    const newUser: User = {
      id: String(mockUsers.length + 1),
      name,
      email,
      role: "user"
    }
    mockUsers.push({ ...newUser, password })
    setUser(newUser)
    return true
  }, [])

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin"
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
