export interface Product {
  id: string
  name: string
  mrp: number
  category: string
  subCategory?: string
  stock: number
  imageUrl?: string
  tags: string[]
  isActive: boolean
  isAvailable: boolean
  createdAt: any
}

export interface Category {
  id: string
  name: string
  description: string
  imageUrl?: string
  subCategories?: SubCategory[]
  createdAt: any
}

export interface SubCategory {
  id: string
  name: string
  description?: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface CustomerInfo {
  name: string
  phone: string
  address: string
}

// Store Settings Interface matching your Firebase structure
export interface StoreSettings {
  // Basic Information
  storeName: string
  storeNameHindi: string
  tagline: string
  description: string

  // Contact Information
  primaryPhone: string
  secondaryPhone: string
  whatsappNumber: string
  email: string
  website: string

  // Address
  address: string
  city: string
  state: string
  pincode: string

  // Store Hours
  mondayToSaturday: string
  sunday: string

  // Social Media
  facebook: string
  instagram: string
  twitter: string

  // SEO
  metaTitle: string
  metaDescription: string
  keywords: string[]

  // Metadata
  createdAt: any
  updatedAt: any
  updatedBy: string
}
