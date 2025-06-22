"use client"

import type React from "react"
import Link from "next/link"
import { Search, ShoppingCart, Menu, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/contexts/cart-context"
import { useLanguage } from "@/contexts/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useState } from "react"
import { useStoreSettings } from "@/contexts/store-settings-context"

export function Header() {
  const { state } = useCart()
  const { t, language } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const { settings } = useStoreSettings()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  // Use Firebase data or fallback to translation keys
  const storeName = settings
    ? language === "hi"
      ? settings.storeNameHindi
      : settings.storeName
    : t("header.store_name")
  const tagline = settings?.tagline || t("header.tagline")
  const phone = settings?.primaryPhone || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "8058124167"

  // Add state for controlling sheet
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  // Update the handleSearch function to not auto-execute in mobile
  const handleMobileSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`
      setIsSheetOpen(false) // Close sheet after search
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-purple-100 shadow-lg">
      {/* Top bar with location */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white py-2">
        <div className="container flex items-center justify-center text-xs md:text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3 md:h-4 md:w-4" />
              <span className="hidden sm:inline">{t("header.free_pickup")}</span>
              <span className="sm:hidden">{t("home.free_pickup")}</span>
            </div>
            <div className="flex items-center gap-1">
              <Phone className="h-3 w-3 md:h-4 md:w-4" />
              <span>+91 {phone}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="flex h-14 md:h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 md:space-x-3">
            <div className="h-8 w-8 md:h-10 md:w-10 rounded-xl bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-500 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm md:text-base">{storeName.charAt(0)}</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-lg md:text-xl bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                {storeName.split(" ")[0]}
              </span>
              <div className="text-xs md:text-sm text-gray-600 -mt-1">{tagline}</div>
            </div>
            <span className="font-bold text-base sm:hidden bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              {storeName.split(" ")[0]}
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="search"
                placeholder={t("header.search_placeholder")}
                className="pl-10 border-purple-200 focus:border-purple-400 focus:ring-purple-400 bg-white/80 backdrop-blur-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>

          {/* Right side */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              <Link
                href="/products"
                className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
              >
                {t("header.products")}
              </Link>
              <Link
                href="/categories"
                className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
              >
                {t("header.categories")}
              </Link>
              <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors">
                {t("header.about")}
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
              >
                {t("header.contact")}
              </Link>
            </nav>

            {/* Cart Button */}
            <Link href="/cart">
              <Button variant="ghost" size="sm" className="relative hover:bg-purple-50 p-2">
                <ShoppingCart className="h-5 w-5 md:h-6 md:w-6 text-purple-600" />
                {state.totalItems > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-gradient-to-r from-red-500 to-pink-500 text-white border-2 border-white">
                    {state.totalItems > 99 ? "99+" : state.totalItems}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden hover:bg-purple-50 p-2">
                  <Menu className="h-5 w-5 text-purple-600" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[280px] sm:w-[350px] bg-gradient-to-br from-purple-50 to-indigo-50"
              >
                <div className="flex flex-col space-y-6 mt-6">
                  {/* Mobile Search */}
                  <form onSubmit={handleMobileSearch}>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        type="search"
                        placeholder={t("products.search_placeholder")}
                        className="pl-10 border-purple-200 focus:border-purple-400 bg-white/80"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </form>

                  {/* Mobile Navigation */}
                  <nav className="flex flex-col space-y-4">
                    <Link
                      href="/products"
                      onClick={() => setIsSheetOpen(false)}
                      className="text-base font-medium text-gray-700 hover:text-purple-600 transition-colors py-2 px-3 rounded-lg hover:bg-white/50"
                    >
                      {t("header.products")}
                    </Link>
                    <Link
                      href="/categories"
                      onClick={() => setIsSheetOpen(false)}
                      className="text-base font-medium text-gray-700 hover:text-purple-600 transition-colors py-2 px-3 rounded-lg hover:bg-white/50"
                    >
                      {t("header.categories")}
                    </Link>
                    <Link
                      href="/about"
                      onClick={() => setIsSheetOpen(false)}
                      className="text-base font-medium text-gray-700 hover:text-purple-600 transition-colors py-2 px-3 rounded-lg hover:bg-white/50"
                    >
                      {t("header.about")}
                    </Link>
                    <Link
                      href="/contact"
                      onClick={() => setIsSheetOpen(false)}
                      className="text-base font-medium text-gray-700 hover:text-purple-600 transition-colors py-2 px-3 rounded-lg hover:bg-white/50"
                    >
                      {t("header.contact")}
                    </Link>
                  </nav>

                  {/* Contact Info */}
                  <div className="bg-white/60 rounded-lg p-4 space-y-2">
                    <h4 className="font-semibold text-gray-900">{t("header.contact")}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="h-4 w-4" />
                      <span>+91 {phone}</span>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
