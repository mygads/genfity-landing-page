"use client"

import type React from "react"

import { useState } from "react"
import { useCart } from "@/components/Cart/CartContext"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, Check, Gift, Info, RefreshCw, Trash2, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface CheckoutForm {
  name: string
  whatsapp: string
  email: string
  notes: string
  voucher: string
}

interface StepProps {
  title: string
  isActive: boolean
  isCompleted: boolean
  number: number
}

const Step = ({ title, isActive, isCompleted, number }: StepProps) => {
  return (
    <div className="flex items-center">
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium
        ${
          isCompleted
            ? "bg-primary text-white"
            : isActive
              ? "border-2 border-primary bg-primary/10 text-primary"
              : "border-2 border-gray-200 text-gray-400 dark:border-gray-700"
        }`}
      >
        {isCompleted ? <Check className="h-4 w-4" /> : number}
      </div>
      <span
        className={`ml-2 text-sm font-medium 
        ${isActive || isCompleted ? "text-primary" : "text-gray-400 dark:text-gray-600"}`}
      >
        {title}
      </span>
    </div>
  )
}

export default function CheckoutPage() {
  const { items, removeFromCart, updateQuantity, clearCart } = useCart()
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0)

  // Group items by category (add-ons vs regular items)
  const addOns = items.filter(
    (item) =>
      item.id.startsWith("addon-") ||
      item.id.includes("additional-") ||
      ["multi-language", "dark-mode", "cdn", "premium-ssl", "custom-email", "analytics", "priority-support"].some(
        (addonId) => item.id.includes(addonId),
      ),
  )
  const regularItems = items.filter((item) => !addOns.some((addon) => addon.id === item.id))

  const [formData, setFormData] = useState<CheckoutForm>({
    name: "",
    whatsapp: "",
    email: "",
    notes: "",
    voucher: "",
  })

  const [step, setStep] = useState(1)
  const [voucherApplied, setVoucherApplied] = useState(false)
  const [voucherDiscount, setVoucherDiscount] = useState(0)
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState(["", "", "", ""])
  const [otpVerified, setOtpVerified] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [voucherError, setVoucherError] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)

      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.querySelector(`input[name="otp-${index + 1}"]`) as HTMLInputElement
        if (nextInput) nextInput.focus()
      }
    }
  }

  const handleSendOtp = () => {
    if (!formData.whatsapp) return

    // Simulate OTP sending
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setOtpSent(true)
    }, 1500)
  }

  const handleVerifyOtp = () => {
    // Simulate OTP verification
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setOtpVerified(true)
      setStep(3)
    }, 1500)
  }

  const handleApplyVoucher = () => {
    if (!formData.voucher) {
      setVoucherError("Masukkan kode voucher terlebih dahulu")
      return
    }

    // Simulate voucher validation (in a real app, this would be API call)
    setIsSubmitting(true)

    setTimeout(() => {
      setIsSubmitting(false)

      // Example: Check if voucher is valid
      if (formData.voucher.toUpperCase() === "DISKON10") {
        setVoucherApplied(true)
        setVoucherDiscount(total * 0.1) // 10% discount
        setVoucherError("")
      } else {
        setVoucherError("Voucher tidak valid atau sudah kadaluarsa")
      }
    }, 1000)
  }

  const handleNextStep = () => {
    // Validate current step before proceeding
    if (step === 1) {
      if (!formData.name || !formData.whatsapp || !formData.email) {
        alert("Harap isi semua kolom wajib (nama, WhatsApp, email)")
        return
      }
      setStep(2)
    }
  }

  const finalAmount = total - voucherDiscount

  if (items.length === 0) {
    return (
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-6">
            <div className="relative inline-block h-32 w-32 opacity-20">
              <Trash2 className="h-full w-full" strokeWidth={1} />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4">Keranjang Anda Kosong</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">Anda belum menambahkan produk apapun ke keranjang</p>
          <Link href="/products">
            <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-white transition-all hover:bg-primary/90">
              <ArrowLeft className="h-4 w-4" />
              Lihat Produk
            </button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>

        <div className="flex items-center justify-between max-w-3xl mb-10">
          <Step number={1} title="Informasi" isActive={step === 1} isCompleted={step > 1} />
          <div className="h-0.5 flex-1 mx-2 bg-gray-200 dark:bg-gray-800">
            <div
              className="h-full bg-primary"
              style={{ width: step > 1 ? "100%" : "0%", transition: "width 0.3s ease" }}
            />
          </div>
          <Step number={2} title="Verifikasi" isActive={step === 2} isCompleted={step > 2} />
          <div className="h-0.5 flex-1 mx-2 bg-gray-200 dark:bg-gray-800">
            <div
              className="h-full bg-primary"
              style={{ width: step > 2 ? "100%" : "0%", transition: "width 0.3s ease" }}
            />
          </div>
          <Step number={3} title="Pembayaran" isActive={step === 3} isCompleted={step > 3} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Order Summary */}
        <div className="lg:col-span-2">
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 mb-6"
            >
              <h2 className="text-xl font-bold mb-4">Informasi Kontak</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Nama Lengkap <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="whatsapp" className="block text-sm font-medium mb-1">
                    Nomor WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="whatsapp"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    placeholder="Contoh: 08123456789"
                    className="w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="notes" className="block text-sm font-medium mb-1">
                    Catatan (opsional)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  />
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-800">
                <div className="flex justify-between">
                  <Link href="/products">
                    <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">
                      <ArrowLeft className="h-4 w-4" />
                      Kembali Belanja
                    </button>
                  </Link>
                  <button
                    onClick={handleNextStep}
                    className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 font-medium text-white transition-all hover:bg-primary/90"
                  >
                    Lanjutkan
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 mb-6"
            >
              <h2 className="text-xl font-bold mb-4">Verifikasi Nomor WhatsApp</h2>

              <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900 rounded-lg p-4 mb-6 flex gap-3">
                <div className="text-blue-500 mt-0.5">
                  <Info className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-blue-800 dark:text-blue-300 text-sm">
                    Kami perlu memverifikasi nomor WhatsApp Anda untuk memastikan informasi kontak yang valid. Kode OTP
                    akan dikirimkan ke nomor WhatsApp Anda.
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-1">Nomor WhatsApp</label>
                <div className="flex items-center">
                  <div className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    {formData.whatsapp}
                  </div>
                  <button
                    onClick={() => setStep(1)}
                    className="ml-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                  >
                    Edit
                  </button>
                </div>
              </div>

              {!otpSent ? (
                <button
                  onClick={handleSendOtp}
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-white transition-all hover:bg-primary/90 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Mengirim OTP...
                    </>
                  ) : (
                    <>
                      Kirim Kode OTP
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              ) : (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-3">Masukkan Kode OTP</label>
                    <div className="flex justify-center gap-3">
                      {[0, 1, 2, 3].map((index) => (
                        <input
                          key={index}
                          type="text"
                          name={`otp-${index}`}
                          maxLength={1}
                          value={otp[index]}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          className="w-12 h-12 text-center text-xl font-bold border border-gray-300 rounded-lg dark:border-gray-700 dark:bg-gray-800"
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <button
                      onClick={handleSendOtp}
                      disabled={isSubmitting}
                      className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:text-primary/80"
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          Mengirim ulang...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="h-4 w-4" />
                          Kirim Ulang OTP
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleVerifyOtp}
                      disabled={otp.join("").length !== 4 || isSubmitting}
                      className="flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 font-medium text-white transition-all hover:bg-primary/90 disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          Memverifikasi...
                        </>
                      ) : (
                        <>
                          Verifikasi
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-800">
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Kembali
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 mb-6"
            >
              <h2 className="text-xl font-bold mb-4">Metode Pembayaran</h2>

              <div className="bg-green-50 dark:bg-green-950/30 border border-green-100 dark:border-green-900 rounded-lg p-4 mb-6 flex gap-3">
                <div className="text-green-500 mt-0.5">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-green-800 dark:text-green-300 text-sm">
                    Nomor WhatsApp Anda telah berhasil diverifikasi. Silakan lanjutkan ke proses pembayaran.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Pilih Metode Pembayaran</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {["Bank Transfer", "Virtual Account", "E-Wallet", "Credit Card"].map((method, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 cursor-pointer hover:border-primary hover:bg-primary/5"
                      >
                        <div className="flex justify-between items-center">
                          <span>{method}</span>
                          <input
                            type="radio"
                            name="payment"
                            defaultChecked={index === 0}
                            className="h-4 w-4 text-primary focus:ring-primary"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Nomor Referensi (opsional)</label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    placeholder="Masukkan nomor referensi jika ada"
                  />
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-800 flex justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Kembali
                </button>

                <Link href="/payment">
                  <button className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 font-medium text-white transition-all hover:bg-primary/90">
                    Lanjut ke Pembayaran
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </Link>
              </div>
            </motion.div>
          )}
        </div>

        {/* Right Column - Order Summary */}
        <div>
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 sticky top-24">
            <h2 className="text-lg font-bold mb-4">Ringkasan Pesanan</h2>

            <div className="max-h-[400px] overflow-y-auto mb-4 pr-2">
              {regularItems.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-medium text-sm mb-2 text-gray-500">Produk</h3>
                  <ul className="space-y-3">
                    {regularItems.map((item) => (
                      <li key={item.id} className="flex gap-3">
                        <div className="h-12 w-12 rounded-md bg-gray-100 dark:bg-gray-800 flex-shrink-0 overflow-hidden">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={48}
                            height={48}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <p className="font-medium text-sm truncate">{item.name}</p>
                            <span className="text-sm ml-2">x{item.qty}</span>
                          </div>
                          <p className="text-primary text-sm">Rp{item.price.toLocaleString()}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {addOns.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-medium text-sm mb-2 text-gray-500">Add-ons</h3>
                  <ul className="space-y-3">
                    {addOns.map((item) => (
                      <li key={item.id} className="flex gap-3">
                        <div className="h-10 w-10 rounded-md bg-primary/10 dark:bg-primary/20 flex-shrink-0 overflow-hidden p-1">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={32}
                            height={32}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <p className="text-xs font-medium truncate">{item.name}</p>
                            <span className="text-xs ml-2">x{item.qty}</span>
                          </div>
                          <p className="text-primary text-xs">Rp{item.price.toLocaleString()}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="border-t border-dashed border-gray-200 dark:border-gray-800 pt-4 mb-4">
              <div className="flex items-center mb-3 gap-2">
                <Gift className="h-4 w-4 text-primary" />
                <h3 className="font-medium">Voucher</h3>
              </div>

              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  name="voucher"
                  value={formData.voucher}
                  onChange={handleInputChange}
                  placeholder="Masukkan kode voucher"
                  className="flex-1 rounded-lg border border-gray-300 p-2 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  disabled={voucherApplied || isSubmitting}
                />
                <button
                  onClick={handleApplyVoucher}
                  disabled={voucherApplied || isSubmitting}
                  className="px-3 py-2 rounded-lg bg-primary text-sm text-white disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : voucherApplied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    "Terapkan"
                  )}
                </button>
              </div>

              {voucherError && <p className="text-red-500 text-xs mb-2">{voucherError}</p>}

              {voucherApplied && (
                <div className="flex justify-between items-center p-2 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded text-sm mb-2">
                  <div className="flex items-center gap-1">
                    <Check className="h-3 w-3" />
                    <span>DISKON10</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>-Rp{voucherDiscount.toLocaleString()}</span>
                    <button
                      onClick={() => {
                        setVoucherApplied(false)
                        setVoucherDiscount(0)
                        setFormData({ ...formData, voucher: "" })
                      }}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
                <span>Rp{total.toLocaleString()}</span>
              </div>

              {voucherApplied && (
                <div className="flex justify-between text-green-600 dark:text-green-400">
                  <span>Diskon</span>
                  <span>-Rp{voucherDiscount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between font-medium text-base pt-2 border-t border-gray-200 dark:border-gray-800">
                <span>Total</span>
                <span>Rp{finalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
