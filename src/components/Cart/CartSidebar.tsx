"use client"

import type React from "react"
import { useCart } from "./CartContext"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingCart, X, Trash2, Plus, Minus, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface CartSidebarProps {
  open: boolean
  onClose: () => void
}

const CartSidebar: React.FC<CartSidebarProps> = ({ open, onClose }) => {
  const { items, removeFromCart, updateQuantity, clearCart } = useCart()
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0)

  // Create a map to group items by category (add-ons vs regular items)
  const addOns = items.filter(
    (item) =>
      item.id.startsWith("addon-") ||
      item.id.includes("additional-") ||
      ["multi-language", "dark-mode", "cdn", "premium-ssl", "custom-email", "analytics", "priority-support"].some(
        (addonId) => item.id.includes(addonId),
      ),
  )
  const regularItems = items.filter((item) => !addOns.some((addon) => addon.id === item.id))

  const handleQuantityUpdate = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id)
    } else {
      updateQuantity(id, newQuantity)
    }
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 z-[99999]"
            onClick={onClose}
            aria-label="Tutup keranjang"
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: open ? 0 : "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="fixed top-0 right-0 h-screen w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl z-[100000] flex flex-col"
      >
        {/* Header with gradient */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-90"></div>
          <div className="relative z-10 flex items-center justify-between p-5">
            <div className="flex items-center gap-2 text-white">
              <ShoppingCart className="h-5 w-5" />
              <h2 className="text-xl font-bold">Keranjang</h2>
              <div className="ml-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-white text-xs font-medium text-primary">
                {items.length}
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Tutup"
              className="rounded-full bg-white/20 p-1.5 text-white transition-colors hover:bg-white/30"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-5">
          <AnimatePresence initial={false}>
            {items.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex h-full flex-col items-center justify-center text-center"
              >
                <div className="relative mb-6 h-32 w-32 opacity-20">
                  <ShoppingCart className="h-full w-full" strokeWidth={1} />
                </div>
                <h3 className="mb-2 text-xl font-medium">Keranjang Kosong</h3>
                <p className="mb-6 text-gray-500 dark:text-gray-400">
                  Tambahkan beberapa produk untuk melanjutkan belanja
                </p>
                <button
                  onClick={onClose}
                  className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-white dark:bg-primary/20"
                >
                  Lanjutkan Belanja
                  <ArrowRight className="h-4 w-4" />
                </button>
              </motion.div>
            ) : (
              <>
                {/* Regular Items */}
                {regularItems.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-medium text-lg mb-3">Produk</h3>
                    <ul className="space-y-4">
                      {regularItems.map((item) => (
                        <motion.li
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          transition={{ type: "spring", damping: 25, stiffness: 200 }}
                          className="group relative rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-800/50"
                        >
                          <div className="flex gap-4">
                            <div className="h-16 w-16 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700">
                              {item.image && (
                                <Image
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  width={64}
                                  height={64}
                                  className="h-full w-full object-cover"
                                />
                              )}
                            </div>
                            <div className="flex flex-1 flex-col">
                              <div className="mb-1 font-medium">{item.name}</div>
                              <div className="mb-3 text-sm text-primary">Rp{item.price.toLocaleString()}</div>
                              <div className="mt-auto flex items-center">
                                <div className="flex items-center rounded-full border border-gray-200 dark:border-gray-700">
                                  <button
                                    onClick={() => handleQuantityUpdate(item.id, Math.max(0, item.qty - 1))}
                                    className="flex h-8 w-8 items-center justify-center rounded-l-full transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                                    aria-label="Kurangi jumlah"
                                  >
                                    <Minus className="h-3 w-3" />
                                  </button>
                                  <span className="flex h-8 w-8 items-center justify-center text-sm font-medium tabular-nums">
                                    {item.qty}
                                  </span>
                                  <button
                                    onClick={() => updateQuantity(item.id, item.qty + 1)}
                                    className="flex h-8 w-8 items-center justify-center rounded-r-full transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                                    aria-label="Tambah jumlah"
                                  >
                                    <Plus className="h-3 w-3" />
                                  </button>
                                </div>
                                <div className="ml-auto text-sm font-medium">
                                  Rp{(item.price * item.qty).toLocaleString()}
                                </div>
                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  className="ml-2 flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/30"
                                  aria-label="Hapus"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Add-ons */}
                {addOns.length > 0 && (
                  <div className="mb-4">
                    <h3 className="font-medium text-lg mb-3 flex items-center">
                      <span className="mr-2">Add-ons</span>
                      <span className="text-xs bg-primary/10 text-primary dark:bg-primary/20 px-2 py-0.5 rounded-full">
                        {addOns.length}
                      </span>
                    </h3>
                    <ul className="space-y-4">
                      {addOns.map((item) => (
                        <motion.li
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          transition={{ type: "spring", damping: 25, stiffness: 200 }}
                          className="group relative rounded-xl border border-dashed border-primary/30 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-primary/20 dark:bg-gray-800/50"
                        >
                          <div className="flex gap-4">
                            <div className="h-12 w-12 overflow-hidden rounded-lg bg-primary/10 dark:bg-primary/20 p-2">
                              {item.image && (
                                <Image
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  width={48}
                                  height={48}
                                  className="h-full w-full object-cover"
                                />
                              )}
                            </div>
                            <div className="flex flex-1 flex-col">
                              <div className="mb-1 text-sm font-medium">{item.name}</div>
                              <div className="mb-1 text-xs text-primary">Rp{item.price.toLocaleString()}</div>
                              <div className="mt-1 flex items-center">
                                <div className="flex items-center rounded-full border border-gray-200 dark:border-gray-700 scale-90">
                                  <button
                                    onClick={() => handleQuantityUpdate(item.id, Math.max(0, item.qty - 1))}
                                    className="flex h-7 w-7 items-center justify-center rounded-l-full transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                                    aria-label="Kurangi jumlah"
                                  >
                                    <Minus className="h-3 w-3" />
                                  </button>
                                  <span className="flex h-7 w-6 items-center justify-center text-xs font-medium tabular-nums">
                                    {item.qty}
                                  </span>
                                  <button
                                    onClick={() => updateQuantity(item.id, item.qty + 1)}
                                    className="flex h-7 w-7 items-center justify-center rounded-r-full transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                                    aria-label="Tambah jumlah"
                                  >
                                    <Plus className="h-3 w-3" />
                                  </button>
                                </div>
                                <div className="ml-auto text-xs font-medium">
                                  Rp{(item.price * item.qty).toLocaleString()}
                                </div>
                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  className="ml-2 flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/30"
                                  aria-label="Hapus"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-900/80">
          {items.length > 0 && (
            <>
              <div className="mb-4 flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
                <span>Rp{total.toLocaleString()}</span>
              </div>
              <div className="mb-6 flex items-center justify-between font-medium">
                <span>Total</span>
                <span className="text-lg">Rp{total.toLocaleString()}</span>
              </div>
              <div className="space-y-3">
                <Link href="/checkout" onClick={onClose}>
                  <button
                    className="relative w-full overflow-hidden rounded-lg bg-primary py-3 font-medium text-white transition-all hover:shadow-lg hover:shadow-primary/30 active:scale-[0.98] disabled:opacity-70"
                    disabled={items.length === 0}
                  >
                    <span className="relative z-10">Checkout</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-0 transition-opacity hover:opacity-100"></span>
                  </button>
                </Link>
                <button
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 py-2.5 text-sm text-gray-500 transition-colors hover:bg-red-50 hover:text-red-500 dark:border-gray-700 dark:hover:bg-red-950/20"
                  onClick={clearCart}
                  disabled={items.length === 0}
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Kosongkan Keranjang</span>
                </button>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </>
  )
}

export default CartSidebar
