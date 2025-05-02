"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  qty: number
  selected?: boolean
}

interface CartContextType {
  items: CartItem[]
  addToCart: (product: CartItem) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  toggleItemSelection: (productId: string, selected: boolean) => void
  selectAllItems: (selected: boolean) => void
  removeSelectedItems: () => void
  selectedItems: CartItem[]
  totalItems: number
  totalPrice: number
  selectedItemsCount: number
  selectedItemsTotal: number
}

const CartContext = createContext<CartContextType>({
  items: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  toggleItemSelection: () => {},
  selectAllItems: () => {},
  removeSelectedItems: () => {},
  selectedItems: [],
  totalItems: 0,
  totalPrice: 0,
  selectedItemsCount: 0,
  selectedItemsTotal: 0,
})

export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (e) {
        console.error("Failed to parse cart from localStorage", e)
      }
    }
  }, [])

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("cart", JSON.stringify(items))
    }
  }, [items, isClient])

  const addToCart = (product: CartItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id)
      if (existingItem) {
        return prevItems.map((item) => (item.id === product.id ? { ...item, qty: item.qty + product.qty } : item))
      } else {
        return [...prevItems, { ...product, selected: true }]
      }
    })
  }

  const removeFromCart = (productId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setItems((prevItems) => prevItems.map((item) => (item.id === productId ? { ...item, qty: quantity } : item)))
  }

  const toggleItemSelection = (productId: string, selected: boolean) => {
    setItems((prevItems) => prevItems.map((item) => (item.id === productId ? { ...item, selected } : item)))
  }

  const selectAllItems = (selected: boolean) => {
    setItems((prevItems) => prevItems.map((item) => ({ ...item, selected })))
  }

  const removeSelectedItems = () => {
    setItems((prevItems) => prevItems.filter((item) => !item.selected))
  }

  const clearCart = () => {
    setItems([])
  }

  const selectedItems = items.filter((item) => item.selected)
  const totalItems = items.reduce((sum, item) => sum + item.qty, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.qty, 0)
  const selectedItemsCount = selectedItems.reduce((sum, item) => sum + item.qty, 0)
  const selectedItemsTotal = selectedItems.reduce((sum, item) => sum + item.price * item.qty, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleItemSelection,
        selectAllItems,
        removeSelectedItems,
        selectedItems,
        totalItems,
        totalPrice,
        selectedItemsCount,
        selectedItemsTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
