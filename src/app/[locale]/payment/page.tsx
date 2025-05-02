"use client"

import { useState } from "react"
import { ArrowLeft, Check, Copy, RefreshCw } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCart } from "@/components/Cart/CartContext"
import { useAuth } from "@/components/Auth/AuthContext"

export default function PaymentPage() {
  const [copied, setCopied] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { removeSelectedItems, selectedItemsTotal } = useCart()
  const { isAuthenticated } = useAuth()

  // Demo payment details
  const paymentDetails = {
    bank: "Bank Central Asia (BCA)",
    accountNumber: "1234567890",
    accountName: "PT Digital Kreasi",
    amount: selectedItemsTotal.toLocaleString(),
    expiry: "24 jam",
    reference: "INV/2023/05/123456",
  }

  const handleCopyClick = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleConfirmPayment = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setConfirmed(true)

      // Remove selected items from cart after successful payment
      removeSelectedItems()

      // Simulate redirect to success page
      setTimeout(() => {
        router.push("/payment/success")
      }, 2000)
    }, 1500)
  }

  return (
    <div className="container mx-auto py-12 pt-24 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Instruksi Pembayaran</h1>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-medium">Transfer Bank</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Selesaikan pembayaran dalam {paymentDetails.expiry}
              </p>
            </div>
            <div className="w-16 h-8">
              <Image
                src="/placeholder.svg?height=32&width=64"
                alt={paymentDetails.bank}
                width={64}
                height={32}
                className="object-contain"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Nomor Rekening</p>
              <div className="flex justify-between items-center">
                <p className="text-lg font-mono font-semibold tracking-wider">{paymentDetails.accountNumber}</p>
                <button
                  onClick={() => handleCopyClick(paymentDetails.accountNumber)}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs flex items-center gap-1"
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3" />
                      Tersalin
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      Salin
                    </>
                  )}
                </button>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Atas Nama</p>
              <p className="font-medium">{paymentDetails.accountName}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Pembayaran</p>
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold text-primary">Rp{paymentDetails.amount}</p>
                <button
                  onClick={() => handleCopyClick(paymentDetails.amount)}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs flex items-center gap-1"
                >
                  {copied ? (
                    <>
                      <Check className="h-3 w-3" />
                      Tersalin
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      Salin
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-dashed border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Nomor Referensi</p>
              <p className="font-medium text-sm">{paymentDetails.reference}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                *Sertakan nomor referensi pada keterangan transfer
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 mb-6">
          <h2 className="text-lg font-medium mb-4">Cara Pembayaran</h2>

          <div className="space-y-4">
            {[
              "Login ke mobile banking atau internet banking Anda",
              "Pilih menu Transfer > Antar Rekening",
              "Masukkan nomor rekening tujuan",
              "Masukkan jumlah transfer sesuai dengan total pembayaran",
              "Masukkan nomor referensi pada keterangan transfer",
              "Periksa kembali informasi transfer Anda dan selesaikan transaksi",
              "Simpan bukti transfer untuk konfirmasi pembayaran",
            ].map((step, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-medium">
                  {index + 1}
                </div>
                <p className="text-sm">{step}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <Link href="/checkout">
            <button className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Checkout
            </button>
          </Link>

          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <button className="px-4 py-2.5 text-sm font-medium text-primary hover:underline">
                Cek Status Pesanan
              </button>
            </Link>

            <button
              onClick={handleConfirmPayment}
              disabled={isLoading || confirmed}
              className="flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-2.5 font-medium text-white transition-all hover:bg-primary/90 disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Memproses...
                </>
              ) : confirmed ? (
                <>
                  <Check className="h-4 w-4" />
                  Pembayaran Dikonfirmasi
                </>
              ) : (
                "Konfirmasi Pembayaran"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
