"use client"

import { CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function PaymentSuccessPage() {
  const [orderId] = useState(`ORD-${Math.floor(100000 + Math.random() * 900000)}`)
  const [countdown, setCountdown] = useState(10)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="container mx-auto py-24 px-4">
      <div className="max-w-md mx-auto text-center">
        <div className="flex justify-center mb-6">
          <div className="h-24 w-24 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <CheckCircle2 className="h-16 w-16 text-green-600 dark:text-green-400" />
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-3">Pembayaran Berhasil!</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Terima kasih atas pembelian Anda. Kami telah menerima pembayaran Anda dan akan segera memproses pesanan Anda.
        </p>

        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 mb-8">
          <div className="flex justify-between mb-3">
            <span className="text-gray-500 dark:text-gray-400">ID Pesanan</span>
            <span className="font-medium">{orderId}</span>
          </div>
          <div className="flex justify-between mb-3">
            <span className="text-gray-500 dark:text-gray-400">Tanggal</span>
            <span className="font-medium">
              {new Date().toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="flex justify-between pt-3 border-t border-gray-200 dark:border-gray-800">
            <span className="text-gray-500 dark:text-gray-400">Status</span>
            <span className="font-medium text-green-600 dark:text-green-400">Lunas</span>
          </div>
        </div>

        <div className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Detail pesanan telah dikirim ke email dan WhatsApp Anda. Tim kami akan segera menghubungi Anda untuk langkah
          selanjutnya.
        </div>

        <div className="space-y-3">
          <Link href="/dashboard">
            <button className="w-full rounded-lg bg-primary py-3 font-medium text-white transition-all hover:bg-primary/90">
              Lihat Status Pesanan
            </button>
          </Link>

          <Link href="/">
            <button className="w-full rounded-lg border border-gray-200 dark:border-gray-700 py-3 font-medium transition-all hover:bg-gray-50 dark:hover:bg-gray-800">
              Kembali ke Beranda {countdown > 0 ? `(${countdown})` : ""}
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
