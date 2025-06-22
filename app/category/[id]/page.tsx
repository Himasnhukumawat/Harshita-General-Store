"use client"

import { useState, useEffect } from "react"
import { notFound } from "next/navigation"
import { ArrowLeft, Grid, List } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { getCategories, getProductsByCategory } from "@/lib/firebase-service"
import type { Product, Category } from "@/lib/types"

interface CategoryPageProps {
  params: {
    id: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const [category, setCategory] = useState<Category | null>(null)
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const [categories, products] = await Promise.all([getCategories(), getProductsByCategory("")])

        const foundCategory = categories.find((cat) => cat.id === params.id)

        if (!foundCategory) {
          notFound()
          return
        }

        setCategory(foundCategory)

        const categoryProducts = products.filter(
          (product) => product.category.toLowerCase() === foundCategory.name.toLowerCase(),
        )

        setAllProducts(categoryProducts)
        setFilteredProducts(categoryProducts)
      } catch (error) {
        console.error("Error loading data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [params.id])

  useEffect(() => {
    if (!selectedSubCategory || selectedSubCategory === "all") {
      setFilteredProducts(allProducts)
    } else {
      const filtered = allProducts.filter(
        (product) => product.subCategory?.toLowerCase() === selectedSubCategory.toLowerCase(),
      )
      setFilteredProducts(filtered)
    }
  }, [selectedSubCategory, allProducts])

  const handleSubCategoryClick = (subCategoryName: string) => {
    if (selectedSubCategory === subCategoryName) {
      setSelectedSubCategory("")
    } else {
      setSelectedSubCategory(subCategoryName)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
        <div className="container py-6">
          <div className="animate-pulse space-y-6">
            <div className="h-16 bg-white/60 rounded-xl"></div>
            <div className="h-20 bg-white/60 rounded-xl"></div>
            <div className="grid gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-24 bg-white/60 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!category) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <div className="container py-6 space-y-6">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-lg border border-purple-100">
          <div className="flex items-center justify-between mb-4">
            <Link href="/categories">
              <Button variant="ghost" size="sm" className="text-purple-600 hover:bg-purple-50 font-medium">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Categories
              </Button>
            </Link>

            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={`h-8 w-8 p-0 ${viewMode === "list" ? "bg-purple-600 hover:bg-purple-700" : "border-purple-200 text-purple-600 hover:bg-purple-50"}`}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={`h-8 w-8 p-0 ${viewMode === "grid" ? "bg-purple-600 hover:bg-purple-700" : "border-purple-200 text-purple-600 hover:bg-purple-50"}`}
              >
                <Grid className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                {category.name}
              </h1>
              <p className="text-sm md:text-base text-gray-600 mt-1">{filteredProducts.length} products available</p>
            </div>

            {category.description && (
              <p className="text-sm md:text-base text-gray-700 leading-relaxed bg-gradient-to-r from-purple-50 to-indigo-50 p-3 md:p-4 rounded-lg">
                {category.description}
              </p>
            )}
          </div>

          {/* Subcategories */}
          {category.subCategories && category.subCategories.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold text-gray-900 mb-3 text-sm md:text-base">Filter by Subcategory:</h3>
              <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide -mx-1 px-1">
                <Button
                  variant={selectedSubCategory === "" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSubCategory("")}
                  className={`whitespace-nowrap h-9 px-3 text-xs md:text-sm font-medium flex-shrink-0 ${
                    selectedSubCategory === ""
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                      : "border-purple-200 text-purple-600 hover:bg-purple-50 bg-white"
                  }`}
                >
                  All ({allProducts.length})
                </Button>
                {category.subCategories.map((subCat) => {
                  const count = allProducts.filter(
                    (p) => p.subCategory?.toLowerCase() === subCat.name.toLowerCase(),
                  ).length
                  return (
                    <Button
                      key={subCat.id}
                      variant={selectedSubCategory === subCat.name ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleSubCategoryClick(subCat.name)}
                      className={`whitespace-nowrap h-9 px-3 text-xs md:text-sm font-medium flex-shrink-0 ${
                        selectedSubCategory === subCat.name
                          ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                          : "border-green-200 text-green-600 hover:bg-green-50 bg-white"
                      }`}
                    >
                      {subCat.name} ({count})
                    </Button>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Products */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 md:p-12 text-center shadow-lg">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">🛍️</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">No Products Found</h3>
            <p className="text-gray-600 mb-6">
              {selectedSubCategory
                ? `No products found in ${selectedSubCategory}.`
                : "No products found in this category."}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              {selectedSubCategory && (
                <Button
                  onClick={() => setSelectedSubCategory("")}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 font-medium"
                >
                  Show All {category.name} Products
                </Button>
              )}
              <Link href="/products">
                <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50 font-medium">
                  Browse All Products
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div
            className={
              viewMode === "list"
                ? "space-y-3 md:space-y-4"
                : "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
            }
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} viewMode={viewMode} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
