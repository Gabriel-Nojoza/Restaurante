"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface PizzaOptions {
  halfAndHalf?: {
    firstHalf: string
    secondHalf: string
  }
  stuffedCrust?: {
    name: string
    price: number
  }
  extras?: {
    name: string
    price: number
  }[]
}

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  observation?: string
  pizzaOptions?: PizzaOptions
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "quantity">) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  updateObservation: (id: string, observation: string) => void
  clearCart: () => void
  total: number
  itemCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = (newItem: Omit<CartItem, "quantity">) => {
    const itemId = newItem.pizzaOptions ? `${newItem.id}-${Date.now()}` : newItem.id

    setItems((prev) => {
      // Pizzas personalizadas sempre são adicionadas como novo item
      if (newItem.pizzaOptions) {
        return [...prev, { ...newItem, id: itemId, quantity: 1 }]
      }

      const existingItem = prev.find((item) => item.id === newItem.id)
      if (existingItem) {
        return prev.map((item) => (item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prev, { ...newItem, quantity: 1 }]
    })
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const updateObservation = (id: string, observation: string) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, observation } : item)))
  }

  const clearCart = () => setItems([])

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        updateObservation,
        clearCart,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
