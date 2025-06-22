import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/contexts/cart-context"
import { LanguageProvider } from "@/contexts/language-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { StoreSettingsProvider } from "@/contexts/store-settings-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Harshita General Store - Your Neighborhood Store",
  description:
    "Shop for daily essentials and more at Harshita General Store. Quality products, great prices, and friendly service.",
  keywords: "general store, groceries, daily essentials, local store",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <StoreSettingsProvider>
            <LanguageProvider>
              <CartProvider>
                <div className="min-h-screen flex flex-col">
                  <Header />
                  <main className="flex-1">{children}</main>
                  <Footer />
                </div>
                <Toaster />
              </CartProvider>
            </LanguageProvider>
          </StoreSettingsProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
