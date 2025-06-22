"use client"

import { useState } from "react"
import Image from "next/image"
import { Plus, Minus, Trash2, ShoppingBag, MessageCircle, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useCart } from "@/contexts/cart-context"
import { useLanguage } from "@/contexts/language-context"
import { useStoreSettings } from "@/contexts/store-settings-context"
import type { CustomerInfo } from "@/lib/types"
import { toast } from "@/hooks/use-toast"
import Link from "next/link"

export default function CartPage() {
  const { state, dispatch } = useCart()
  const { t } = useLanguage()
  const { settings } = useStoreSettings()
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: "",
    phone: "",
    address: "",
  })
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false)

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
  }

  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id })
  }

  const generateWhatsAppMessage = () => {
    const whatsappNumber = settings?.whatsappNumber || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "8058124167"

    let message = `🛒 *${t("cart.place_order")}*\n\n`
    message += `*${t("customer.info")}:*\n`
    message += `${t("customer.full_name")}: ${customerInfo.name}\n`
    message += `${t("customer.phone")}: ${customerInfo.phone}\n`
    message += `${t("customer.address")}: ${customerInfo.address}\n\n`
    message += `*${t("cart.order_summary")}:*\n`

    state.items.forEach((item) => {
      message += `• ${item.product.name} - ${t("cart.items")}: ${item.quantity} - ₹${item.product.mrp * item.quantity}\n`
    })

    message += `\n*${t("cart.order_summary")}:*\n`
    message += `${t("cart.total")} ${t("cart.items")}: ${state.totalItems}\n`
    message += `${t("cart.total")}: ₹${state.totalAmount}\n\n`
    message += `कृपया मेरे ऑर्डर की पुष्टि करें और पिकअप विवरण प्रदान करें।\nधन्यवाद!`

    const whatsappUrl = `https://wa.me/91${whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")

    setIsOrderDialogOpen(false)
    toast({
      title: t("toast.order_sent"),
      description: t("toast.order_sent_desc"),
    })
  }

  const isFormValid = customerInfo.name && customerInfo.phone && customerInfo.address

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center p-8">
          <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h1 className="text-xl font-bold text-gray-900 mb-2">{t("cart.empty_title")}</h1>
          <p className="text-gray-600 mb-6">{t("cart.empty_desc")}</p>
          <Link href="/products">
            <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
              {t("cart.start_shopping")}
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <div className="container py-6 space-y-6">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-purple-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/products">
                <Button variant="ghost" size="sm" className="text-purple-600 hover:bg-purple-50">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{t("cart.my_cart")}</h1>
                <p className="text-sm text-gray-600">
                  {state.totalItems} {t("cart.items")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Cart Items */}
        <div className="space-y-3">
          {state.items.map((item) => (
            <div
              key={item.product.id}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-purple-100"
            >
              <div className="flex gap-3">
                {/* Product Image */}
                <div className="w-16 h-16 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg overflow-hidden flex-shrink-0">
                  {item.product.imageUrl ? (
                    <Image
                      src={item.product.imageUrl || "/placeholder.svg"}
                      alt={item.product.name}
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ShoppingBag className="h-6 w-6 text-purple-400" />
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm text-gray-900 line-clamp-2 mb-1">{item.product.name}</h3>
                  <p className="text-xs text-gray-600 mb-2">{item.product.category}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                        ₹{item.product.mrp}
                      </span>
                      <span className="text-xs text-gray-500 line-through">₹{Math.round(item.product.mrp * 1.2)}</span>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="h-8 w-8 p-0 border-purple-200"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="font-medium text-sm w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="h-8 w-8 p-0 border-purple-200"
                        disabled={item.quantity >= item.product.stock}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-semibold text-gray-900">
                      {t("cart.total")}: ₹{item.product.mrp * item.quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.product.id)}
                      className="text-red-600 hover:bg-red-50 h-8 px-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-purple-100">
          <h3 className="font-bold text-lg text-gray-900 mb-3">{t("cart.order_summary")}</h3>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                {t("cart.items")} ({state.totalItems})
              </span>
              <span className="text-gray-900">₹{state.totalAmount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">{t("cart.delivery")}</span>
              <span className="text-green-600 font-medium">{t("cart.free")}</span>
            </div>
            <div className="border-t pt-2">
              <div className="flex justify-between font-bold text-lg">
                <span className="text-gray-900">{t("cart.total")}</span>
                <span className="text-gray-900">₹{state.totalAmount}</span>
              </div>
            </div>
          </div>

          <Dialog open={isOrderDialogOpen} onOpenChange={setIsOrderDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 h-12 text-base font-medium">
                <MessageCircle className="mr-2 h-5 w-5" />
                {t("cart.place_order")}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>{t("customer.info")}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t("customer.full_name")} *</Label>
                  <Input
                    id="name"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder={t("customer.name_placeholder")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t("customer.phone")} *</Label>
                  <Input
                    id="phone"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo((prev) => ({ ...prev, phone: e.target.value }))}
                    placeholder={t("customer.phone_placeholder")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">{t("customer.address")} *</Label>
                  <Textarea
                    id="address"
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo((prev) => ({ ...prev, address: e.target.value }))}
                    placeholder={t("customer.address_placeholder")}
                    rows={3}
                  />
                </div>
                <Button
                  onClick={generateWhatsAppMessage}
                  disabled={!isFormValid}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  {t("customer.send_order")}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Pickup Info */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
          <div className="text-sm space-y-1">
            <p className="font-medium text-blue-900">📍 {t("cart.pickup_info")}</p>
            <p className="text-blue-800">{t("cart.pickup_desc")}</p>
            <p className="font-medium text-blue-900">💰 {t("cart.cash_pickup")}</p>
            <p className="text-blue-800">{t("cart.cash_desc")}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
