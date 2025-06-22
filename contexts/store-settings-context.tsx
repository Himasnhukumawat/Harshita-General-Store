"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { getStoreSettings, type StoreSettings } from "@/lib/firebase-service"

interface StoreSettingsContextType {
  settings: StoreSettings | null
  loading: boolean
  refreshSettings: () => Promise<void>
}

const StoreSettingsContext = createContext<StoreSettingsContextType | null>(null)

export function StoreSettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<StoreSettings | null>(null)
  const [loading, setLoading] = useState(true)

  const refreshSettings = async () => {
    try {
      setLoading(true)
      const storeSettings = await getStoreSettings()
      setSettings(storeSettings)
    } catch (error) {
      console.error("Error loading store settings:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshSettings()
  }, [])

  return (
    <StoreSettingsContext.Provider value={{ settings, loading, refreshSettings }}>
      {children}
    </StoreSettingsContext.Provider>
  )
}

export function useStoreSettings() {
  const context = useContext(StoreSettingsContext)
  if (!context) {
    throw new Error("useStoreSettings must be used within a StoreSettingsProvider")
  }
  return context
}
