"use client"

import Link from "next/link"
import { MapPin, Phone, Mail, Clock, Heart } from "lucide-react"
import { useStoreSettings } from "@/contexts/store-settings-context"
import { useLanguage } from "@/contexts/language-context"

export function Footer() {
  const { settings } = useStoreSettings()
  const { language } = useLanguage()

  if (!settings) {
    return null // Don't render footer if no settings
  }

  const storeName = language === "hi" ? settings.storeNameHindi : settings.storeName

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
          {/* Store Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold">{storeName.charAt(0)}</span>
              </div>
              <div>
                <h3 className="font-bold text-lg md:text-xl">{storeName}</h3>
                <p className="text-xs text-purple-200">{settings.tagline}</p>
              </div>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">{settings.description}</p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg text-white">Quick Links</h4>
            <nav className="flex flex-col space-y-3 text-sm">
              <Link href="/products" className="text-gray-300 hover:text-purple-300 transition-colors">
                Products
              </Link>
              <Link href="/categories" className="text-gray-300 hover:text-purple-300 transition-colors">
                Categories
              </Link>
              <Link href="/about" className="text-gray-300 hover:text-purple-300 transition-colors">
                About Us
              </Link>
              <Link href="/contact" className="text-gray-300 hover:text-purple-300 transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg text-white">Contact Info</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-purple-400 flex-shrink-0" />
                <span className="text-gray-300">+91 {settings.primaryPhone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-purple-400 flex-shrink-0" />
                <span className="text-gray-300">{settings.email}</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 mt-0.5 text-purple-400 flex-shrink-0" />
                <span className="text-gray-300">
                  {settings.address}
                  <br />
                  {settings.city}, {settings.state}
                </span>
              </div>
            </div>
          </div>

          {/* Store Hours */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg text-white">Store Hours</h4>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start space-x-3">
                <Clock className="h-4 w-4 mt-0.5 text-purple-400 flex-shrink-0" />
                <div>
                  <div className="font-medium">Mon-Sat: {settings.mondayToSaturday}</div>
                  <div>Sun: {settings.sunday}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-purple-800 mt-8 pt-8 text-center">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} {storeName}. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-400 fill-current" />
              <span>for our community</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
