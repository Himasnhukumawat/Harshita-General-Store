"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, ShoppingBag, Clock, MapPin, Star, Truck, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ProductCard } from "@/components/product-card"
import { getFeaturedProducts, getCategories } from "@/lib/firebase-service"
import { useLanguage } from "@/contexts/language-context"
import { useStoreSettings } from "@/contexts/store-settings-context"
import type { Product, Category } from "@/lib/types"

export default function HomePage() {
  const { t, language } = useLanguage()
  const { settings } = useStoreSettings()
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const [productsData, categoriesData] = await Promise.all([getFeaturedProducts(8), getCategories()])
        setFeaturedProducts(productsData)
        setCategories(categoriesData)
      } catch (error) {
        console.error("Error loading data:", error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t("common.loading")}</p>
        </div>
      </div>
    )
  }

  const storeName = settings
    ? language === "hi"
      ? settings.storeNameHindi
      : settings.storeName
    : t("header.store_name")
  const tagline = settings?.tagline || t("home.hero_description")
  const description = settings?.description || t("home.hero_description")

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container py-12 md:py-20">
          <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {t("home.welcome")}{" "}
                <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  {storeName}
                </span>
              </h1>
              <p className="text-lg md:text-xl text-purple-100 max-w-2xl mx-auto leading-relaxed">
                {settings?.tagline || description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/products">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 py-3 text-base shadow-xl"
                >
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  {t("home.shop_now")}
                </Button>
              </Link>
              <Link href="/categories">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-purple-600 font-semibold px-8 py-3 text-base"
                >
                  {t("home.browse_categories")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-8 pt-8 text-purple-200">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="text-sm md:text-base">4.8 {t("home.rating")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <span className="text-sm md:text-base">{t("home.trusted_store")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                <span className="text-sm md:text-base">{t("home.free_pickup")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-8 md:py-12 space-y-8 md:space-y-12">
        {/* Store Features */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <Card className="bg-white/80 backdrop-blur-sm border-purple-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <ShoppingBag className="h-6 w-6 md:h-8 md:w-8 text-white" />
              </div>
              <h3 className="font-bold text-lg md:text-xl text-gray-900">{t("features.whatsapp_title")}</h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">{t("features.whatsapp_desc")}</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-green-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <Clock className="h-6 w-6 md:h-8 md:w-8 text-white" />
              </div>
              <h3 className="font-bold text-lg md:text-xl text-gray-900">{t("features.pickup_title")}</h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">{t("features.pickup_desc")}</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-orange-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <MapPin className="h-6 w-6 md:h-8 md:w-8 text-white" />
              </div>
              <h3 className="font-bold text-lg md:text-xl text-gray-900">{t("features.local_title")}</h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">{t("features.local_desc")}</p>
            </CardContent>
          </Card>
        </section>

        {/* Featured Products */}
        {featuredProducts.length > 0 && (
          <section className="space-y-6 md:space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  {t("products.featured")}
                </h2>
                <p className="text-gray-600 mt-2">{t("products.featured_desc")}</p>
              </div>
              <Link href="/products">
                <Button
                  variant="outline"
                  className="border-purple-200 text-purple-600 hover:bg-purple-50 font-semibold"
                >
                  {t("products.view_all")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="space-y-3 md:space-y-4">
              {featuredProducts.slice(0, 6).map((product) => (
                <ProductCard key={product.id} product={product} viewMode="list" />
              ))}
            </div>
          </section>
        )}

        {/* Categories */}
        {categories.length > 0 && (
          <section className="space-y-6 md:space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  {t("products.shop_by_category")}
                </h2>
                <p className="text-gray-600 mt-2">{t("products.category_desc")}</p>
              </div>
              <Link href="/categories">
                <Button
                  variant="outline"
                  className="border-purple-200 text-purple-600 hover:bg-purple-50 font-semibold"
                >
                  {t("products.view_all")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {categories.slice(0, 8).map((category, index) => {
                const gradients = [
                  "from-purple-500 to-indigo-500",
                  "from-blue-500 to-cyan-500",
                  "from-green-500 to-emerald-500",
                  "from-yellow-500 to-orange-500",
                  "from-red-500 to-pink-500",
                  "from-indigo-500 to-purple-500",
                  "from-teal-500 to-green-500",
                  "from-orange-500 to-red-500",
                ]
                return (
                  <Link key={category.id} href={`/category/${category.id}`}>
                    <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm border-0 overflow-hidden">
                      <CardContent className="p-4 md:p-6 text-center space-y-3">
                        <div
                          className={`w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br ${gradients[index % gradients.length]} rounded-full flex items-center justify-center mx-auto shadow-lg`}
                        >
                          <span className="text-white font-bold text-lg md:text-xl">{category.name.charAt(0)}</span>
                        </div>
                        <h3 className="font-bold text-sm md:text-base text-gray-900">{category.name}</h3>
                        {category.description && (
                          <p className="text-xs md:text-sm text-gray-600 line-clamp-2 leading-relaxed">
                            {category.description}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </section>
        )}

        {/* Store Info */}
        {settings && (
          <section className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 rounded-2xl md:rounded-3xl p-6 md:p-12 text-white">
            <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">{t("store.visit_title")}</h2>
                <p className="text-purple-100 text-sm md:text-base">{t("store.visit_desc")}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                {/* Address Card */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-sm md:text-base">{t("store.location")}</h3>
                      <p className="text-purple-100 text-xs md:text-sm">{t("store.location_desc")}</p>
                    </div>
                  </div>
                  <div className="text-white text-sm md:text-base pl-13">
                    <p>{settings.address}</p>
                    <p>
                      {settings.city}, {settings.state} - {settings.pincode}
                    </p>
                  </div>
                </div>

                {/* Hours Card */}
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      <Clock className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-sm md:text-base">{t("store.hours")}</h3>
                      <p className="text-purple-100 text-xs md:text-sm">{t("store.hours_desc")}</p>
                    </div>
                  </div>
                  <div className="text-white text-sm md:text-base pl-13 space-y-1">
                    <div>Mon-Sat: {settings.mondayToSaturday}</div>
                    <div>Sun: {settings.sunday}</div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-6 md:px-8 py-3 text-sm md:text-base"
                  >
                    <MapPin className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                    {t("store.get_directions")}
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
