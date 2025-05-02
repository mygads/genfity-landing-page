"use client"

import { useState } from "react"
import { useCart } from "@/components/Cart/CartContext"
import type { Package, Addon } from "@/types/product"
import { ChevronRight } from "lucide-react"
import { FaDesktop, FaPenNib, FaChartLine, FaHeadphones } from "react-icons/fa"
import { GradientCard } from "@/components/ui/gradient-card"
import { AddonCard } from "@/components/ui/addon-card"
import { addons, categories, packages } from "./components/productsData"

const categoryIcons: Record<string, React.ComponentType<any>> = {
  website: FaDesktop,
  design: FaPenNib,
  marketing: FaChartLine,
  support: FaHeadphones,
}

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("website")
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("company-profile")
  const { addToCart } = useCart()

  const filteredPackages = packages.filter(
    (pkg) => pkg.category === selectedCategory && pkg.subcategory === selectedSubcategory,
  )

  const currentCategory = categories.find((cat) => cat.id === selectedCategory)
  const subcategories = currentCategory?.subcategories || []

  const handleAddToCart = (pkg: Package) => {
    addToCart({
      id: pkg.id,
      name: pkg.name,
      price: pkg.price,
      image: pkg.image,
      qty: 1,
    })
  }

  const handleAddAddon = (addon: Addon) => {
    addToCart({
      id: addon.id,
      name: addon.name,
      price: addon.price,
      image: addon.image,
      qty: 1,
    })
  }

  return (
    <div className="container mx-auto py-12 pt-24 px-4">
      <div className="relative mb-12 overflow-hidden rounded-3xl bg-gradient-to-r from-primary/80 to-primary p-8 text-white">
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-2">Our Packages</h1>
          <p className="text-white/80 max-w-2xl">
            Choose the perfect package for your business needs. We offer a variety of services to help you grow your
            online presence and reach your goals.
          </p>
        </div>
        <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-white/10 blur-3xl"></div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-4 sticky top-24">
            <h2 className="font-semibold text-lg mb-4 border-b pb-2">Categories</h2>
            <ul className="space-y-1">
              {categories.map((category) => {
                const IconComponent = categoryIcons[category.id]
                const isActive = selectedCategory === category.id

                return (
                  <li key={category.id}>
                    <button
                      onClick={() => {
                        setSelectedCategory(category.id)
                        setSelectedSubcategory(category.subcategories[0]?.id || "")
                      }}
                      className={`flex items-center w-full px-3 py-2 rounded-lg text-left transition-colors ${
                        isActive
                          ? "bg-primary/10 text-primary dark:bg-primary/20"
                          : "hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      {IconComponent && <IconComponent className="w-4 h-4 mr-2" />}
                      {category.name}
                    </button>

                    {isActive && category.subcategories.length > 0 && (
                      <ul className="ml-7 mt-1 space-y-1 border-l border-gray-200 dark:border-gray-700 pl-2">
                        {category.subcategories.map((subcategory) => (
                          <li key={subcategory.id}>
                            <button
                              onClick={() => setSelectedSubcategory(subcategory.id)}
                              className={`flex items-center w-full px-3 py-1.5 rounded-md text-sm text-left transition-colors ${
                                selectedSubcategory === subcategory.id
                                  ? "bg-primary/10 text-primary dark:bg-primary/20"
                                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
                              }`}
                            >
                              <ChevronRight className="w-3 h-3 mr-1" />
                              {subcategory.name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Current Category & Subcategory */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">
              {currentCategory?.name} - {subcategories.find((sub) => sub.id === selectedSubcategory)?.name}
            </h2>
            <p className="text-gray-500 dark:text-gray-400">Select the package that best fits your needs and budget</p>
          </div>

          {/* Packages */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
            {filteredPackages.map((pkg) => (
              <GradientCard
                key={pkg.id}
                title={pkg.name}
                description={pkg.description}
                price={pkg.price}
                features={pkg.features}
                popular={pkg.popular}
                gradientClass={pkg.bgColor}
                onAction={() => handleAddToCart(pkg)}
              />
            ))}
          </div>

          {/* Add-ons Section - Only show for website development */}
          {selectedCategory === "website" && (
            <div className="mt-16">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-1">Add-ons</h2>
                  <p className="text-gray-500 dark:text-gray-400">
                    Enhance your website with these additional features
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {addons.map((addon) => (
                  <AddonCard
                    key={addon.id}
                    title={addon.name}
                    description={addon.description}
                    price={addon.price}
                    image={addon.image}
                    onAdd={() => handleAddAddon(addon)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
