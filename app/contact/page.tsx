"use client"

import type React from "react"
import { useState } from "react"
import { MapPin, Phone, Mail, Clock, Send, Facebook, Instagram, Twitter, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useStoreSettings } from "@/contexts/store-settings-context"
import { useLanguage } from "@/contexts/language-context"
import { toast } from "@/hooks/use-toast"

export default function ContactPage() {
  const { settings, loading } = useStoreSettings()
  const { t, language } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!settings?.whatsappNumber) {
      toast({
        title: "Error",
        description: "WhatsApp number not configured",
        variant: "destructive",
      })
      return
    }

    // Create WhatsApp message
    const whatsappMessage = `*Contact Form Submission*\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`
    const whatsappUrl = `https://wa.me/91${settings.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`

    window.open(whatsappUrl, "_blank")

    // Reset form
    setFormData({ name: "", email: "", phone: "", message: "" })

    toast({
      title: t("toast.order_sent"),
      description: t("toast.order_sent_desc"),
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

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

  if (!settings) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Store settings not configured</p>
        </div>
      </div>
    )
  }

  const storeName = language === "hi" ? settings.storeNameHindi : settings.storeName

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <div className="container py-8">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              {t("contact.title")}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("contact.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm border-purple-100">
                <CardHeader>
                  <CardTitle className="text-purple-600">{t("contact.store_info")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-900">Address</h3>
                      <div className="text-muted-foreground">
                        <p>{settings.address}</p>
                        <p>
                          {settings.city}, {settings.state} - {settings.pincode}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-900">Phone</h3>
                      <div className="text-muted-foreground space-y-1">
                        <p>+91 {settings.primaryPhone}</p>
                        {settings.secondaryPhone && <p>+91 {settings.secondaryPhone}</p>}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-900">Email</h3>
                      <p className="text-muted-foreground">{settings.email}</p>
                    </div>
                  </div>

                  {settings.website && (
                    <div className="flex items-start space-x-3">
                      <Globe className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-gray-900">Website</h3>
                        <a
                          href={settings.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-600 hover:text-purple-700 underline"
                        >
                          {settings.website}
                        </a>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-900">Store Hours</h3>
                      <div className="text-muted-foreground">
                        <p>Monday - Saturday: {settings.mondayToSaturday}</p>
                        <p>Sunday: {settings.sunday}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-purple-100">
                <CardContent className="p-6">
                  <h3 className="font-medium mb-4 text-purple-600">{t("contact.quick_actions")}</h3>
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-start border-purple-200 text-purple-600 hover:bg-purple-50"
                      onClick={() => window.open(`tel:+91${settings.primaryPhone}`, "_blank")}
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      {t("contact.call_now")}
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-green-200 text-green-600 hover:bg-green-50"
                      onClick={() => window.open(`https://wa.me/91${settings.whatsappNumber}`, "_blank")}
                    >
                      <Send className="mr-2 h-4 w-4" />
                      {t("contact.whatsapp_us")}
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-blue-200 text-blue-600 hover:bg-blue-50"
                      onClick={() => window.open(`mailto:${settings.email}`, "_blank")}
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      {t("contact.send_email")}
                    </Button>
                  </div>

                  {/* Social Media Links */}
                  {(settings.facebook || settings.instagram || settings.twitter) && (
                    <div className="mt-6 pt-4 border-t">
                      <h4 className="font-medium mb-3 text-gray-900">Follow Us</h4>
                      <div className="flex gap-3">
                        {settings.facebook && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(settings.facebook, "_blank")}
                            className="border-blue-200 text-blue-600 hover:bg-blue-50"
                          >
                            <Facebook className="h-4 w-4" />
                          </Button>
                        )}
                        {settings.instagram && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(settings.instagram, "_blank")}
                            className="border-pink-200 text-pink-600 hover:bg-pink-50"
                          >
                            <Instagram className="h-4 w-4" />
                          </Button>
                        )}
                        {settings.twitter && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(settings.twitter, "_blank")}
                            className="border-blue-200 text-blue-600 hover:bg-blue-50"
                          >
                            <Twitter className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="bg-white/80 backdrop-blur-sm border-purple-100">
              <CardHeader>
                <CardTitle className="text-purple-600">{t("contact.send_message")}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t("customer.full_name")} *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder={t("customer.name_placeholder")}
                        className="border-purple-200 focus:border-purple-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">{t("customer.phone")} *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder={t("customer.phone_placeholder")}
                        className="border-purple-200 focus:border-purple-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className="border-purple-200 focus:border-purple-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">{t("contact.message")} *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder={t("contact.message_placeholder")}
                      rows={5}
                      className="border-purple-200 focus:border-purple-400"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    {t("contact.send_via_whatsapp")}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Map Section */}
          <Card className="bg-white/80 backdrop-blur-sm border-purple-100">
            <CardHeader>
              <CardTitle className="text-purple-600">{t("contact.find_us")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg flex items-center justify-center">
                <div className="text-center space-y-2">
                  <MapPin className="h-12 w-12 mx-auto text-purple-400" />
                  <p className="text-muted-foreground">{t("contact.map_integration")}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-purple-200 text-purple-600 hover:bg-purple-50"
                    onClick={() => {
                      const address = `${settings.address}, ${settings.city}, ${settings.state} ${settings.pincode}`
                      const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
                      window.open(mapsUrl, "_blank")
                    }}
                  >
                    {t("store.get_directions")}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
