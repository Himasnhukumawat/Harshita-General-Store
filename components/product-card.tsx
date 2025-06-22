"use client"

import type React from "react"
import Image from "next/image"
import { ShoppingCart, Package, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/types"
import { useCart } from "@/contexts/cart-context"
import { useLanguage } from "@/contexts/language-context"
import { toast } from "@/hooks/use-toast"

interface ProductCardProps {
  product: Product
  viewMode?: "grid" | "list"
}

export function ProductCard({ product, viewMode = "grid" }: ProductCardProps) {
  const { dispatch } = useCart()
  const { t } = useLanguage()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (product.stock <= 0) {
      toast({
        title: t("toast.out_of_stock_title"),
        description: t("toast.out_of_stock_desc"),
        variant: "destructive",
      })
      return
    }

    dispatch({ type: "ADD_ITEM", payload: product })
    toast({
      title: t("toast.added_to_cart"),
      description: `${product.name} ${t("toast.product_added")}`,
    })
  }

  const isOutOfStock = product.stock <= 0
  const isLowStock = product.stock > 0 && product.stock < 5

  if (viewMode === "list") {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 md:p-4 shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-300">
        <div className="flex gap-3 md:gap-4">
          {/* Image */}
          <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg overflow-hidden flex-shrink-0 relative">
            {product.imageUrl ? (
              <Image src={product.imageUrl || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Package className="h-6 w-6 md:h-8 md:w-8 text-purple-400" />
              </div>
            )}

            {/* Stock badges */}
            {isOutOfStock && (
              <div className="absolute top-1 right-1">
                <Badge variant="destructive" className="text-xs px-1 py-0">
                  {t("products.out_of_stock").split(" ")[0]}
                </Badge>
              </div>
            )}
            {isLowStock && !isOutOfStock && (
              <div className="absolute top-1 right-1">
                <Badge className="text-xs px-1 py-0 bg-gradient-to-r from-orange-500 to-red-500">
                  {t("products.low_stock").split(" ")[0]}
                </Badge>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm md:text-base text-gray-900 line-clamp-2 mb-1 md:mb-2">
              {product.name}
            </h3>

            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-gray-600 ml-1">4.2</span>
              </div>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-purple-600 font-medium">{product.category}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  ₹{product.mrp}
                </span>
                <span className="text-xs text-gray-500 line-through">₹{Math.round(product.mrp * 1.2)}</span>
                <Badge className="text-xs bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600">
                  {Math.round(((product.mrp * 1.2 - product.mrp) / (product.mrp * 1.2)) * 100)}% {t("products.off")}
                </Badge>
              </div>
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="flex-shrink-0 flex items-center">
            <Button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              size="sm"
              className={`h-8 md:h-9 px-3 md:px-4 text-xs md:text-sm font-medium ${
                isOutOfStock
                  ? "bg-gray-300 text-gray-500"
                  : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg"
              }`}
            >
              {isOutOfStock ? t("products.out_of_stock") : t("common.add")}
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Grid view
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 md:p-4 shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="aspect-square relative mb-3 overflow-hidden rounded-lg bg-gradient-to-br from-purple-50 to-indigo-50">
        {product.imageUrl ? (
          <Image src={product.imageUrl || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="h-8 w-8 md:h-12 md:w-12 text-purple-400" />
          </div>
        )}

        {/* Stock badges */}
        {isOutOfStock && (
          <div className="absolute top-2 right-2">
            <Badge variant="destructive" className="text-xs">
              {t("products.out_of_stock")}
            </Badge>
          </div>
        )}
        {isLowStock && !isOutOfStock && (
          <div className="absolute top-2 right-2">
            <Badge className="text-xs bg-gradient-to-r from-orange-500 to-red-500">{t("products.low_stock")}</Badge>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="font-semibold line-clamp-2 text-sm md:text-base text-gray-900">{product.name}</h3>

        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs text-gray-600 ml-1">4.2</span>
          </div>
          <span className="text-xs text-gray-400">•</span>
          <span className="text-xs text-purple-600 font-medium">{product.category}</span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="space-y-1">
            <p className="text-lg md:text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              ₹{product.mrp}
            </p>
            <p className="text-xs text-gray-500 line-through">₹{Math.round(product.mrp * 1.2)}</p>
          </div>
          <Badge className="text-xs bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600">
            {Math.round(((product.mrp * 1.2 - product.mrp) / (product.mrp * 1.2)) * 100)}% {t("products.off")}
          </Badge>
        </div>

        <Button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`w-full text-xs md:text-sm h-8 md:h-9 font-medium ${
            isOutOfStock
              ? "bg-gray-300 text-gray-500"
              : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg"
          }`}
        >
          <ShoppingCart className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
          {isOutOfStock ? t("products.out_of_stock") : t("products.add_to_cart")}
        </Button>
      </div>
    </div>
  )
}
