"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "hi"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | null>(null)

// Translation data
const translations = {
  en: {
    // Header
    "header.store_name": "Harshita General Store",
    "header.tagline": "General Store",
    "header.search_placeholder": "Search for products...",
    "header.products": "Products",
    "header.categories": "Categories",
    "header.about": "About",
    "header.contact": "Contact",
    "header.free_pickup": "Free pickup from store",
    "header.call": "Call",

    // Home Page
    "home.welcome": "Welcome to",
    "home.hero_description":
      "Your trusted neighborhood store for all daily essentials and more. Quality products, great prices, and friendly service.",
    "home.shop_now": "Shop Now",
    "home.browse_categories": "Browse Categories",
    "home.rating": "Rating",
    "home.trusted_store": "Trusted Store",
    "home.free_pickup": "Free Pickup",

    // Features
    "features.whatsapp_title": "Easy WhatsApp Ordering",
    "features.whatsapp_desc": "Add items to cart and send your order directly via WhatsApp for quick processing.",
    "features.pickup_title": "Quick Pickup",
    "features.pickup_desc": "Order online and pick up from our store. No delivery charges, just convenience.",
    "features.local_title": "Local Store",
    "features.local_desc": "Supporting your community with quality products and personal service.",

    // Products
    "products.featured": "Featured Products",
    "products.featured_desc": "Handpicked items just for you",
    "products.view_all": "View All",
    "products.shop_by_category": "Shop by Category",
    "products.category_desc": "Find exactly what you need",
    "products.all_products": "All Products",
    "products.products": "products",
    "products.available": "available",
    "products.search_placeholder": "Search products...",
    "products.category": "Category",
    "products.all_categories": "All Categories",
    "products.newest": "Newest",
    "products.name_az": "Name A-Z",
    "products.price_low_high": "Price: Low-High",
    "products.price_high_low": "Price: High-Low",
    "products.clear_filter": "Clear Filter",
    "products.no_products": "No products found matching your criteria",
    "products.clear_filters": "Clear All Filters",
    "products.add_to_cart": "Add to Cart",
    "products.out_of_stock": "Out of Stock",
    "products.low_stock": "Low Stock",
    "products.off": "OFF",

    // Category
    "category.back_to_categories": "Back to Categories",
    "category.filter_by_subcategory": "Filter by Subcategory:",
    "category.all": "All",
    "category.no_products_found": "No Products Found",
    "category.no_products_desc": "No products found in this category.",
    "category.no_products_sub_desc": "No products found in",
    "category.show_all_products": "Show All",
    "category.browse_all_products": "Browse All Products",

    // Cart
    "cart.my_cart": "My Cart",
    "cart.items": "items",
    "cart.empty_title": "Your cart is empty",
    "cart.empty_desc": "Add some products to get started",
    "cart.start_shopping": "Start Shopping",
    "cart.total": "Total",
    "cart.order_summary": "Order Summary",
    "cart.delivery": "Delivery",
    "cart.free": "FREE",
    "cart.place_order": "Place Order via WhatsApp",
    "cart.pickup_info": "Store Pickup Only",
    "cart.pickup_desc": "Orders are for in-store pickup. No delivery charges.",
    "cart.cash_pickup": "Cash on Pickup",
    "cart.cash_desc": "Payment when collecting your order from store.",

    // Customer Info
    "customer.info": "Customer Information",
    "customer.full_name": "Full Name",
    "customer.phone": "Phone Number",
    "customer.address": "Address",
    "customer.name_placeholder": "Enter your full name",
    "customer.phone_placeholder": "Enter your phone number",
    "customer.address_placeholder": "Enter your complete address",
    "customer.send_order": "Send Order to WhatsApp",

    // Store Info
    "store.visit_title": "Visit Our Store",
    "store.visit_desc": "Come and experience our quality products in person",
    "store.location": "Store Location",
    "store.location_desc": "Visit us at our store",
    "store.hours": "Store Hours",
    "store.hours_desc": "We're open for you",
    "store.address": "Your Store Address",
    "store.mon_sat": "Mon-Sat: 9AM-8PM",
    "store.sun": "Sun: 10AM-6PM",
    "store.get_directions": "Get Directions",

    // Common
    "common.back": "Back",
    "common.add": "ADD",
    "common.loading": "Loading...",
    "common.error": "Error",
    "common.success": "Success",
    "common.cancel": "Cancel",
    "common.save": "Save",
    "common.edit": "Edit",
    "common.delete": "Delete",
    "common.close": "Close",

    // Toast Messages
    "toast.added_to_cart": "Added to Cart",
    "toast.product_added": "added to cart",
    "toast.out_of_stock_title": "Out of Stock",
    "toast.out_of_stock_desc": "This product is currently out of stock.",
    "toast.order_sent": "Order Sent!",
    "toast.order_sent_desc": "Your order has been sent via WhatsApp.",

    // About Page
    "about.title": "About Harshita General Store",
    "about.subtitle":
      "Your trusted neighborhood store serving the community with quality products and exceptional service since our establishment.",
    "about.our_story": "Our Story",
    "about.story_p1":
      "Harshita General Store has been a cornerstone of our community, providing essential goods and services to families and businesses in the area. What started as a small family business has grown into a trusted local institution.",
    "about.story_p2":
      "We pride ourselves on offering a wide range of quality products at competitive prices, from daily essentials to specialty items. Our commitment to customer satisfaction and community service drives everything we do.",
    "about.story_p3":
      "Today, we're embracing technology to better serve our customers while maintaining the personal touch and community spirit that has always defined our store.",
    "about.our_values": "Our Values",
    "about.community_first": "Community First",
    "about.community_desc":
      "We believe in supporting our local community and building lasting relationships with our customers.",
    "about.quality_assurance": "Quality Assurance",
    "about.quality_desc":
      "Every product we stock is carefully selected to meet our high standards for quality and value.",
    "about.customer_care": "Customer Care",
    "about.customer_desc":
      "Your satisfaction is our priority. We go the extra mile to ensure you have a great experience.",

    // Contact Page
    "contact.title": "Contact Us",
    "contact.subtitle": "Get in touch with us for any questions, feedback, or assistance. We're here to help!",
    "contact.store_info": "Store Information",
    "contact.quick_actions": "Quick Actions",
    "contact.call_now": "Call Us Now",
    "contact.whatsapp_us": "WhatsApp Us",
    "contact.send_email": "Send Email",
    "contact.send_message": "Send us a Message",
    "contact.message": "Message",
    "contact.message_placeholder": "How can we help you?",
    "contact.send_via_whatsapp": "Send Message via WhatsApp",
    "contact.find_us": "Find Us",
    "contact.map_integration": "Map integration can be added here",
  },
  hi: {
    // Header
    "header.store_name": "हर्षिता जनरल स्टोर",
    "header.tagline": "जनरल स्टोर",
    "header.search_placeholder": "उत्पाद खोजें...",
    "header.products": "उत्पाद",
    "header.categories": "श्रेणियां",
    "header.about": "हमारे बारे में",
    "header.contact": "संपर्क",
    "header.free_pickup": "स्टोर से मुफ्त पिकअप",
    "header.call": "कॉल करें",

    // Home Page
    "home.welcome": "आपका स्वागत है",
    "home.hero_description":
      "दैनिक आवश्यकताओं और अन्य सामानों के लिए आपका विश्वसनीय पड़ोसी स्टोर। गुणवत्तापूर्ण उत्पाद, बेहतरीन कीमतें, और मित्रवत सेवा।",
    "home.shop_now": "अभी खरीदारी करें",
    "home.browse_categories": "श्रेणियां देखें",
    "home.rating": "रेटिंग",
    "home.trusted_store": "विश्वसनीय स्टोर",
    "home.free_pickup": "मुफ्त पिकअप",

    // Features
    "features.whatsapp_title": "आसान व्हाट्सऐप ऑर्डरिंग",
    "features.whatsapp_desc": "कार्ट में आइटम जोड़ें और तुरंत प्रोसेसिंग के लिए व्हाट्सऐप के माध्यम से अपना ऑर्डर भेजें।",
    "features.pickup_title": "त्वरित पिकअप",
    "features.pickup_desc": "ऑनलाइन ऑर्डर करें और हमारे स्टोर से पिकअप करें। कोई डिलीवरी चार्ज नहीं, केवल सुविधा।",
    "features.local_title": "स्थानीय स्टोर",
    "features.local_desc": "गुणवत्तापूर्ण उत्पादों और व्यक्तिगत सेवा के साथ आपके समुदाय का समर्थन।",

    // Products
    "products.featured": "विशेष उत्पाद",
    "products.featured_desc": "आपके लिए चुने गए आइटम",
    "products.view_all": "सभी देखें",
    "products.shop_by_category": "श्रेणी के अनुसार खरीदारी",
    "products.category_desc": "वही खोजें जिसकी आपको जरूरत है",
    "products.all_products": "सभी उत्पाद",
    "products.products": "उत्पाद",
    "products.available": "उपलब्ध",
    "products.search_placeholder": "उत्पाद खोजें...",
    "products.category": "श्रेणी",
    "products.all_categories": "सभी श्रेणियां",
    "products.newest": "नवीनतम",
    "products.name_az": "नाम अ-ज्ञ",
    "products.price_low_high": "कीमत: कम-ज्यादा",
    "products.price_high_low": "कीमत: ज्यादा-कम",
    "products.clear_filter": "फिल्टर साफ़ करें",
    "products.no_products": "आपके मापदंड से मेल खाने वाले कोई उत्पाद नहीं मिले",
    "products.clear_filters": "सभी फिल्टर साफ़ करें",
    "products.add_to_cart": "कार्ट में जोड़ें",
    "products.out_of_stock": "स्टॉक में नहीं",
    "products.low_stock": "कम स्टॉक",
    "products.off": "छूट",

    // Category
    "category.back_to_categories": "श्रेणियों पर वापस",
    "category.filter_by_subcategory": "उप-श्रेणी के अनुसार फिल्टर करें:",
    "category.all": "सभी",
    "category.no_products_found": "कोई उत्पाद नहीं मिला",
    "category.no_products_desc": "इस श्रेणी में कोई उत्पाद नहीं मिला।",
    "category.no_products_sub_desc": "में कोई उत्पाद नहीं मिला",
    "category.show_all_products": "सभी दिखाएं",
    "category.browse_all_products": "सभी उत्पाद देखें",

    // Cart
    "cart.my_cart": "मेरा कार्ट",
    "cart.items": "आइटम",
    "cart.empty_title": "आपका कार्ट खाली है",
    "cart.empty_desc": "शुरुआत करने के लिए कुछ उत्पाद जोड़ें",
    "cart.start_shopping": "खरीदारी शुरू करें",
    "cart.total": "कुल",
    "cart.order_summary": "ऑर्डर सारांश",
    "cart.delivery": "डिलीवरी",
    "cart.free": "मुफ्त",
    "cart.place_order": "व्हाट्सऐप के माध्यम से ऑर्डर दें",
    "cart.pickup_info": "केवल स्टोर पिकअप",
    "cart.pickup_desc": "ऑर्डर स्टोर पिकअप के लिए हैं। कोई डिलीवरी चार्ज नहीं।",
    "cart.cash_pickup": "पिकअप पर नकद",
    "cart.cash_desc": "स्टोर से अपना ऑर्डर लेते समय भुगतान।",

    // Customer Info
    "customer.info": "ग्राहक जानकारी",
    "customer.full_name": "पूरा नाम",
    "customer.phone": "फोन नंबर",
    "customer.address": "पता",
    "customer.name_placeholder": "अपना पूरा नाम दर्ज करें",
    "customer.phone_placeholder": "अपना फोन नंबर दर्ज करें",
    "customer.address_placeholder": "अपना पूरा पता दर्ज करें",
    "customer.send_order": "व्हाट्सऐप पर ऑर्डर भेजें",

    // Store Info
    "store.visit_title": "हमारे स्टोर पर आएं",
    "store.visit_desc": "आकर हमारे गुणवत्तापूर्ण उत्पादों का अनुभव करें",
    "store.location": "स्टोर का स्थान",
    "store.location_desc": "हमारे स्टोर पर आएं",
    "store.hours": "स्टोर का समय",
    "store.hours_desc": "हम आपके लिए खुले हैं",
    "store.address": "आपके स्टोर का पता",
    "store.mon_sat": "सोम-शनि: सुबह 9-रात 8",
    "store.sun": "रवि: सुबह 10-शाम 6",
    "store.get_directions": "दिशा निर्देश पाएं",

    // Common
    "common.back": "वापस",
    "common.add": "जोड़ें",
    "common.loading": "लोड हो रहा है...",
    "common.error": "त्रुटि",
    "common.success": "सफलता",
    "common.cancel": "रद्द करें",
    "common.save": "सेव करें",
    "common.edit": "संपादित करें",
    "common.delete": "हटाएं",
    "common.close": "बंद करें",

    // Toast Messages
    "toast.added_to_cart": "कार्ट में जोड़ा गया",
    "toast.product_added": "कार्ट में जोड़ा गया",
    "toast.out_of_stock_title": "स्टॉक में नहीं",
    "toast.out_of_stock_desc": "यह उत्पाद वर्तमान में स्टॉक में नहीं है।",
    "toast.order_sent": "ऑर्डर भेजा गया!",
    "toast.order_sent_desc": "आपका ऑर्डर व्हाट्सऐप के माध्यम से भेजा गया है।",

    // About Page
    "about.title": "हर्षिता जनरल स्टोर के बारे में",
    "about.subtitle":
      "आपका विश्वसनीय पड़ोसी स्टोर जो स्थापना के बाद से गुणवत्तापूर्ण उत्पादों और असाधारण सेवा के साथ समुदाय की सेवा कर रहा है।",
    "about.our_story": "हमारी कहानी",
    "about.story_p1":
      "हर्षिता जनरल स्टोर हमारे समुदाय का आधारस्तंभ रहा है, जो क्षेत्र के परिवारों और व्यवसायों को आवश्यक वस्तुओं और सेवाओं की आपूर्ति करता है। जो एक छोटे पारिवारिक व्यवसाय के रूप में शुरू हुआ था, वह एक विश्वसनीय स्थानीय संस्थान बन गया है।",
    "about.story_p2":
      "हम दैनिक आवश्यकताओं से लेकर विशेष वस्तुओं तक, प्रतिस्पर्धी कीमतों पर गुणवत्तापूर्ण उत्पादों की एक विस्तृत श्रृंखला प्रदान करने पर गर्व करते हैं। ग्राहक संतुष्टि और सामुदायिक सेवा के प्रति हमारी प्रतिबद्धता हमारे सभी कार्यों को प्रेरित करती है।",
    "about.story_p3":
      "आज, हम अपने ग्राहकों की बेहतर सेवा के लिए प्रौद्योगिकी को अपना रहे हैं, जबकि व्यक्तिगत स्पर्श और सामुदायिक भावना को बनाए रख रहे हैं जो हमेशा हमारे स्टोर को परिभाषित करती है।",
    "about.our_values": "हमारे मूल्य",
    "about.community_first": "समुदाय पहले",
    "about.community_desc": "हम अपने स्थानीय समुदाय का समर्थन करने और अपने ग्राहकों के साथ स्थायी संबंध बनाने में विश्वास करते हैं।",
    "about.quality_assurance": "गुणवत्ता आश्वासन",
    "about.quality_desc":
      "हमारे द्वारा स्टॉक किया जाने वाला हर उत्पाद गुणवत्ता और मूल्य के लिए हमारे उच्च मानकों को पूरा करने के लिए सावधानीपूर्वक चुना जाता है।",
    "about.customer_care": "ग्राहक देखभाल",
    "about.customer_desc":
      "आपकी संतुष्टि हमारी प्राथमिकता है। हम यह सुनिश्चित करने के लिए अतिरिक्त मील जाते हैं कि आपका अनुभव बेहतरीन हो।",

    // Contact Page
    "contact.title": "हमसे संपर्क करें",
    "contact.subtitle": "किसी भी प्रश्न, फीडबैक या सहायता के लिए हमसे संपर्क करें। हम यहां मदद के लिए हैं!",
    "contact.store_info": "स्टोर की जानकारी",
    "contact.quick_actions": "त्वरित कार्य",
    "contact.call_now": "अभी कॉल करें",
    "contact.whatsapp_us": "व्हाट्सऐप करें",
    "contact.send_email": "ईमेल भेजें",
    "contact.send_message": "हमें संदेश भेजें",
    "contact.message": "संदेश",
    "contact.message_placeholder": "हम आपकी कैसे मदद कर सकते हैं?",
    "contact.send_via_whatsapp": "व्हाट्सऐप के माध्यम से संदेश भेजें",
    "contact.find_us": "हमें खोजें",
    "contact.map_integration": "यहां मैप एकीकरण जोड़ा जा सकता है",
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("harshita-language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "hi")) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("harshita-language", language)
  }, [language])

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
