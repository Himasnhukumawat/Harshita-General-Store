"use client"

import { Clock, MapPin, Phone, Mail, Users, Award, Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useStoreSettings } from "@/contexts/store-settings-context"
import { useLanguage } from "@/contexts/language-context"

export default function AboutPage() {
  const { settings, loading } = useStoreSettings()
  const { language } = useLanguage()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
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
        <div className="space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              About {storeName}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{settings.tagline}</p>
          </div>

          {/* Story Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>{settings.description}</p>
                <p>
                  We pride ourselves on offering a wide range of quality products at competitive prices, from daily
                  essentials to specialty items. Our commitment to customer satisfaction and community service drives
                  everything we do.
                </p>
                <p>
                  Today, we're embracing technology to better serve our customers while maintaining the personal touch
                  and community spirit that has always defined our store.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-white/80 backdrop-blur-sm border-purple-100">
                <CardContent className="p-6 text-center">
                  <Users className="h-8 w-8 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">Community Focused</h3>
                  <p className="text-sm text-muted-foreground">Serving our local community with dedication</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-purple-100">
                <CardContent className="p-6 text-center">
                  <Award className="h-8 w-8 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">Quality Products</h3>
                  <p className="text-sm text-muted-foreground">Carefully selected items for your needs</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-purple-100">
                <CardContent className="p-6 text-center">
                  <Heart className="h-8 w-8 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">Personal Service</h3>
                  <p className="text-sm text-muted-foreground">Friendly, knowledgeable staff ready to help</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-purple-100">
                <CardContent className="p-6 text-center">
                  <Clock className="h-8 w-8 mx-auto mb-4 text-primary" />
                  <h3 className="font-semibold mb-2">Convenient Hours</h3>
                  <p className="text-sm text-muted-foreground">Open when you need us most</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Values Section */}
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-8 border border-purple-100">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">Community First</h3>
                <p className="text-muted-foreground">
                  We believe in supporting our local community and building lasting relationships with our customers.
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">Quality Assurance</h3>
                <p className="text-muted-foreground">
                  Every product we stock is carefully selected to meet our high standards for quality and value.
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">Customer Care</h3>
                <p className="text-muted-foreground">
                  Your satisfaction is our priority. We go the extra mile to ensure you have a great experience.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-white/80 backdrop-blur-sm border-purple-100">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4 text-purple-600">Visit Our Store</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Address</p>
                      <div className="text-sm text-muted-foreground">
                        <p>{settings.address}</p>
                        <p>
                          {settings.city}, {settings.state} - {settings.pincode}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Store Hours</p>
                      <div className="text-sm text-muted-foreground">
                        <p>Mon-Sat: {settings.mondayToSaturday}</p>
                        <p>Sun: {settings.sunday}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-purple-100">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4 text-purple-600">Get in Touch</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <div className="text-sm text-muted-foreground">
                        <p>+91 {settings.primaryPhone}</p>
                        {settings.secondaryPhone && <p>+91 {settings.secondaryPhone}</p>}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">{settings.email}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
