"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Search, Grid, List, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProductCard } from "@/components/product-card"
import { getActiveProducts, getCategories } from "@/lib/firebase-service"
import type { Product, Category } from "@/lib/types"

function ProductsContent() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")

  useEffect(() => {
    async function loadData() {
      try {
        const [productsData, categoriesData] = await Promise.all([getActiveProducts(), getCategories()])
        setProducts(productsData)
        setCategories(categoriesData)
      } catch (error) {
        console.error("Error loading data:", error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  useEffect(() => {
    let filtered = [...products]

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    // Filter by category
    if (selectedCategory && selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    // Sort products
    switch (sortBy) {
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "price-low":
        filtered.sort((a, b) => a.mrp - b.mrp)
        break
      case "price-high":
        filtered.sort((a, b) => b.mrp - a.mrp)
        break
      case "newest":
      default:
        filtered.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds)
        break
    }

    setFilteredProducts(filtered)
  }, [products, searchQuery, selectedCategory, sortBy])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container py-4">
          <div className="animate-pulse space-y-4">
            <div className="h-16 bg-white rounded-lg"></div>
            <div className="grid gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-24 bg-white rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-4 space-y-4">
        {/* Header */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-xl font-bold text-gray-900">All Products</h1>
              <p className="text-sm text-gray-600">{filteredProducts.length} products</p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="h-8 w-8 p-0"
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="h-8 w-8 p-0"
              >
                <Grid className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-10 border-gray-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-32 h-8 text-xs">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-32 h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
                <SelectItem value="price-low">Price: Low-High</SelectItem>
                <SelectItem value="price-high">Price: High-Low</SelectItem>
              </SelectContent>
            </Select>

            {selectedCategory && selectedCategory !== "all" && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedCategory("all")}
                className="h-8 px-3 text-xs whitespace-nowrap"
              >
                Clear Filter
              </Button>
            )}
          </div>
        </div>

        {/* Products */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center">
            <Filter className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 mb-4">No products found matching your criteria</p>
            <Button
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("all")
              }}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Clear All Filters
            </Button>
          </div>
        ) : (
          <div className={viewMode === "list" ? "space-y-3" : "grid grid-cols-2 gap-3"}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} viewMode={viewMode} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50">
          <div className="container py-4">
            <div className="animate-pulse space-y-4">
              <div className="h-16 bg-white rounded-lg"></div>
              <div className="grid gap-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-24 bg-white rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  )
}
