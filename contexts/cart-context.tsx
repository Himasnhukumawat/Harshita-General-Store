"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"
import type { CartItem, Product } from "@/lib/types"

interface CartState {
  items: CartItem[]
  totalItems: number
  totalAmount: number
}

type CartAction =
  | { type: "ADD_ITEM"; payload: Product }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; payload: CartItem[] }

const CartContext = createContext<{
  state: CartState
  dispatch: React.Dispatch<CartAction>
} | null>(null)

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find((item) => item.product.id === action.payload.id)

      if (existingItem) {
        const updatedItems = state.items.map((item) =>
          item.product.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
        return calculateTotals({ ...state, items: updatedItems })
      }

      const newItems = [...state.items, { product: action.payload, quantity: 1 }]
      return calculateTotals({ ...state, items: newItems })
    }

    case "REMOVE_ITEM": {
      const newItems = state.items.filter((item) => item.product.id !== action.payload)
      return calculateTotals({ ...state, items: newItems })
    }

    case "UPDATE_QUANTITY": {
      if (action.payload.quantity <= 0) {
        const newItems = state.items.filter((item) => item.product.id !== action.payload.id)
        return calculateTotals({ ...state, items: newItems })
      }

      const updatedItems = state.items.map((item) =>
        item.product.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item,
      )
      return calculateTotals({ ...state, items: updatedItems })
    }

    case "CLEAR_CART":
      return { items: [], totalItems: 0, totalAmount: 0 }

    case "LOAD_CART":
      return calculateTotals({ ...state, items: action.payload })

    default:
      return state
  }
}

function calculateTotals(state: CartState): CartState {
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0)
  const totalAmount = state.items.reduce((sum, item) => sum + item.product.mrp * item.quantity, 0)
  return { ...state, totalItems, totalAmount }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    totalItems: 0,
    totalAmount: 0,
  })

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("harshita-cart")
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart)
        dispatch({ type: "LOAD_CART", payload: cartItems })
      } catch (error) {
        console.error("Error loading cart from localStorage:", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("harshita-cart", JSON.stringify(state.items))
  }, [state.items])

  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
