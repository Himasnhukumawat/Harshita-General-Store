import { collection, getDocs, doc, getDoc } from "firebase/firestore"
import { db } from "./firebase"
import type { Product, Category, StoreSettings } from "./types"

// Enhanced sample data with proper subcategories
const sampleProducts: Product[] = [
  // Groceries - Grains & Cereals
  {
    id: "sample-1",
    name: "Premium Basmati Rice (5kg)",
    mrp: 450,
    category: "Groceries",
    subCategory: "Grains & Cereals",
    stock: 25,
    imageUrl: "/placeholder.svg?height=300&width=300",
    tags: ["rice", "basmati", "premium", "groceries"],
    isActive: true,
    isAvailable: true,
    createdAt: { seconds: Date.now() / 1000 },
  },
  {
    id: "sample-2",
    name: "Wheat Flour (10kg)",
    mrp: 380,
    category: "Groceries",
    subCategory: "Grains & Cereals",
    stock: 15,
    imageUrl: "/placeholder.svg?height=300&width=300",
    tags: ["wheat", "flour", "atta", "groceries"],
    isActive: true,
    isAvailable: true,
    createdAt: { seconds: Date.now() / 1000 },
  },
  // Groceries - Cooking Oil
  {
    id: "sample-3",
    name: "Sunflower Cooking Oil (1L)",
    mrp: 120,
    category: "Groceries",
    subCategory: "Cooking Oil",
    stock: 20,
    imageUrl: "/placeholder.svg?height=300&width=300",
    tags: ["oil", "cooking", "sunflower", "groceries"],
    isActive: true,
    isAvailable: true,
    createdAt: { seconds: Date.now() / 1000 },
  },
  {
    id: "sample-4",
    name: "Mustard Oil (500ml)",
    mrp: 85,
    category: "Groceries",
    subCategory: "Cooking Oil",
    stock: 18,
    imageUrl: "/placeholder.svg?height=300&width=300",
    tags: ["oil", "mustard", "cooking", "groceries"],
    isActive: true,
    isAvailable: true,
    createdAt: { seconds: Date.now() / 1000 },
  },
  // Groceries - Pulses & Lentils
  {
    id: "sample-5",
    name: "Toor Dal (1kg)",
    mrp: 140,
    category: "Groceries",
    subCategory: "Pulses & Lentils",
    stock: 22,
    imageUrl: "/placeholder.svg?height=300&width=300",
    tags: ["dal", "toor", "pulses", "groceries"],
    isActive: true,
    isAvailable: true,
    createdAt: { seconds: Date.now() / 1000 },
  },
  {
    id: "sample-6",
    name: "Moong Dal (1kg)",
    mrp: 160,
    category: "Groceries",
    subCategory: "Pulses & Lentils",
    stock: 16,
    imageUrl: "/placeholder.svg?height=300&width=300",
    tags: ["dal", "moong", "pulses", "groceries"],
    isActive: true,
    isAvailable: true,
    createdAt: { seconds: Date.now() / 1000 },
  },
  // Groceries - Spices & Seasonings
  {
    id: "sample-7",
    name: "Turmeric Powder (200g)",
    mrp: 45,
    category: "Groceries",
    subCategory: "Spices & Seasonings",
    stock: 30,
    imageUrl: "/placeholder.svg?height=300&width=300",
    tags: ["turmeric", "haldi", "spices", "groceries"],
    isActive: true,
    isAvailable: true,
    createdAt: { seconds: Date.now() / 1000 },
  },
  {
    id: "sample-8",
    name: "Red Chili Powder (100g)",
    mrp: 35,
    category: "Groceries",
    subCategory: "Spices & Seasonings",
    stock: 25,
    imageUrl: "/placeholder.svg?height=300&width=300",
    tags: ["chili", "mirch", "spices", "groceries"],
    isActive: true,
    isAvailable: true,
    createdAt: { seconds: Date.now() / 1000 },
  },
  // Dairy Products
  {
    id: "sample-9",
    name: "Fresh Milk (1L)",
    mrp: 65,
    category: "Dairy",
    subCategory: "Milk",
    stock: 15,
    imageUrl: "/placeholder.svg?height=300&width=300",
    tags: ["milk", "fresh", "dairy", "organic"],
    isActive: true,
    isAvailable: true,
    createdAt: { seconds: Date.now() / 1000 },
  },
  {
    id: "sample-10",
    name: "Greek Yogurt (400g)",
    mrp: 85,
    category: "Dairy",
    subCategory: "Yogurt",
    stock: 12,
    imageUrl: "/placeholder.svg?height=300&width=300",
    tags: ["yogurt", "greek", "dairy", "healthy"],
    isActive: true,
    isAvailable: true,
    createdAt: { seconds: Date.now() / 1000 },
  },
  // Snacks
  {
    id: "sample-11",
    name: "Mixed Namkeen (200g)",
    mrp: 55,
    category: "Snacks",
    subCategory: "Traditional Snacks",
    stock: 20,
    imageUrl: "/placeholder.svg?height=300&width=300",
    tags: ["namkeen", "snacks", "traditional", "spicy"],
    isActive: true,
    isAvailable: true,
    createdAt: { seconds: Date.now() / 1000 },
  },
  {
    id: "sample-12",
    name: "Potato Chips (150g)",
    mrp: 40,
    category: "Snacks",
    subCategory: "Chips & Crisps",
    stock: 25,
    imageUrl: "/placeholder.svg?height=300&width=300",
    tags: ["chips", "potato", "snacks", "crispy"],
    isActive: true,
    isAvailable: true,
    createdAt: { seconds: Date.now() / 1000 },
  },
]

const sampleCategories: Category[] = [
  {
    id: "Z1IkRqWZcbWk2kVrI2n4",
    name: "Groceries",
    description:
      "Essential grocery items including grains, pulses, spices, and cooking essentials for your daily needs.",
    imageUrl: "/placeholder.svg?height=200&width=200",
    subCategories: [
      { id: "grains", name: "Grains & Cereals" },
      { id: "pulses", name: "Pulses & Lentils" },
      { id: "spices", name: "Spices & Seasonings" },
      { id: "oil", name: "Cooking Oil" },
    ],
    createdAt: { seconds: Date.now() / 1000 },
  },
  {
    id: "cat-dairy",
    name: "Dairy",
    description: "Fresh dairy products including milk, yogurt, cheese, and other dairy essentials.",
    imageUrl: "/placeholder.svg?height=200&width=200",
    subCategories: [
      { id: "milk", name: "Milk" },
      { id: "yogurt", name: "Yogurt" },
      { id: "cheese", name: "Cheese" },
    ],
    createdAt: { seconds: Date.now() / 1000 },
  },
  {
    id: "cat-snacks",
    name: "Snacks",
    description: "Delicious snacks and munchies for every craving and occasion.",
    imageUrl: "/placeholder.svg?height=200&width=200",
    subCategories: [
      { id: "traditional", name: "Traditional Snacks" },
      { id: "chips", name: "Chips & Crisps" },
      { id: "biscuits", name: "Biscuits & Cookies" },
    ],
    createdAt: { seconds: Date.now() / 1000 },
  },
  {
    id: "cat-fruits",
    name: "Fruits",
    description: "Fresh seasonal fruits sourced from local farms for the best quality and taste.",
    imageUrl: "/placeholder.svg?height=200&width=200",
    subCategories: [
      { id: "fresh-fruits", name: "Fresh Fruits" },
      { id: "seasonal", name: "Seasonal Fruits" },
    ],
    createdAt: { seconds: Date.now() / 1000 },
  },
  {
    id: "cat-vegetables",
    name: "Vegetables",
    description: "Farm-fresh vegetables delivered daily to ensure maximum freshness and nutrition.",
    imageUrl: "/placeholder.svg?height=200&width=200",
    subCategories: [
      { id: "fresh-vegetables", name: "Fresh Vegetables" },
      { id: "leafy-greens", name: "Leafy Greens" },
    ],
    createdAt: { seconds: Date.now() / 1000 },
  },
  {
    id: "cat-bakery",
    name: "Bakery",
    description: "Freshly baked bread, cakes, and pastries made daily in our local bakery.",
    imageUrl: "/placeholder.svg?height=200&width=200",
    subCategories: [
      { id: "bread", name: "Bread" },
      { id: "cakes", name: "Cakes" },
      { id: "pastries", name: "Pastries" },
    ],
    createdAt: { seconds: Date.now() / 1000 },
  },
]

// Fetch store settings from Firebase using your exact structure
export async function getStoreSettings(): Promise<StoreSettings | null> {
  try {
    // Fetch from store_settings collection with document ID 'store_settings'
    const settingsRef = doc(db, "store_settings", "store_settings")
    const snapshot = await getDoc(settingsRef)

    if (!snapshot.exists()) {
      console.log("No store settings found in Firebase")
      return null
    }

    const data = snapshot.data() as StoreSettings
    return data
  } catch (error) {
    console.error("Error fetching store settings:", error)
    return null
  }
}

export async function getActiveProducts(): Promise<Product[]> {
  try {
    const productsRef = collection(db, "products")
    const snapshot = await getDocs(productsRef)

    if (snapshot.empty) {
      // Return sample data if no products in Firebase
      console.log("No products found in Firebase, using sample data")
      return sampleProducts
    }

    const allProducts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Product)

    // Filter active and available products on the client side
    const activeProducts = allProducts
      .filter((product) => product.isActive && product.isAvailable)
      .sort((a, b) => {
        // Sort by createdAt if available, otherwise by name
        if (a.createdAt && b.createdAt) {
          return b.createdAt.seconds - a.createdAt.seconds
        }
        return a.name.localeCompare(b.name)
      })

    // If no active products, return sample data
    return activeProducts.length > 0 ? activeProducts : sampleProducts
  } catch (error) {
    console.error("Error fetching products:", error)
    return sampleProducts
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const categoriesRef = collection(db, "categories")
    const snapshot = await getDocs(categoriesRef)

    if (snapshot.empty) {
      // Return sample data if no categories in Firebase
      console.log("No categories found in Firebase, using sample data")
      return sampleCategories
    }

    const categories = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Category)
    return categories.length > 0 ? categories : sampleCategories
  } catch (error) {
    console.error("Error fetching categories:", error)
    return sampleCategories
  }
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  try {
    const products = await getActiveProducts()

    if (!category) {
      return products
    }

    return products.filter((product) => product.category.toLowerCase() === category.toLowerCase())
  } catch (error) {
    console.error("Error fetching products by category:", error)
    return []
  }
}

export async function getFeaturedProducts(limitCount = 8): Promise<Product[]> {
  try {
    const products = await getActiveProducts()
    return products.slice(0, limitCount)
  } catch (error) {
    console.error("Error fetching featured products:", error)
    return []
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const products = await getActiveProducts()
    return products.find((product) => product.id === id) || null
  } catch (error) {
    console.error("Error fetching product by ID:", error)
    return null
  }
}

export async function getCategoryById(id: string): Promise<Category | null> {
  try {
    const categories = await getCategories()
    return categories.find((category) => category.id === id) || null
  } catch (error) {
    console.error("Error fetching category by ID:", error)
    return null
  }
}
