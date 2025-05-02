"use client"

import { useAuth } from "@/components/Auth/AuthContext"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Check, Clock, FileText, RefreshCw, Search, ShoppingBag, User, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface Transaction {
  id: string
  date: string
  amount: number
  status: "pending" | "completed" | "cancelled"
  items: {
    id: string
    name: string
    price: number
    qty: number
    image: string
  }[]
  paymentMethod: string
  invoiceNumber: string
}

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"orders" | "profile">("orders")
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(true)

  useEffect(() => {
    // Redirect if not authenticated
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }

    // Load mock transactions
    if (isAuthenticated) {
      setIsLoadingTransactions(true)
      setTimeout(() => {
        setTransactions([
          {
            id: "trx-001",
            date: "2023-05-15",
            amount: 3500000,
            status: "completed",
            items: [
              {
                id: "basic-company-profile",
                name: "Basic Company Profile",
                price: 1500000,
                qty: 1,
                image: "/placeholder.svg?height=200&width=300",
              },
              {
                id: "additional-page",
                name: "Additional Page",
                price: 300000,
                qty: 2,
                image: "/placeholder.svg?height=80&width=80",
              },
            ],
            paymentMethod: "Bank Transfer",
            invoiceNumber: "INV/2023/05/001",
          },
          {
            id: "trx-002",
            date: "2023-05-20",
            amount: 2000000,
            status: "pending",
            items: [
              {
                id: "premium-landing-page",
                name: "Premium Landing Page",
                price: 2000000,
                qty: 1,
                image: "/placeholder.svg?height=200&width=300",
              },
            ],
            paymentMethod: "Virtual Account",
            invoiceNumber: "INV/2023/05/002",
          },
          {
            id: "trx-003",
            date: "2023-05-10",
            amount: 800000,
            status: "cancelled",
            items: [
              {
                id: "basic-logo-design",
                name: "Basic Logo Design",
                price: 800000,
                qty: 1,
                image: "/placeholder.svg?height=200&width=300",
              },
            ],
            paymentMethod: "E-Wallet",
            invoiceNumber: "INV/2023/05/003",
          },
        ])
        setIsLoadingTransactions(false)
      }, 1500)
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="container mx-auto py-16 px-4 flex justify-center items-center min-h-[60vh]">
        <div className="flex flex-col items-center">
          <RefreshCw className="h-8 w-8 animate-spin text-primary mb-4" />
          <p className="text-gray-500 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Will redirect in useEffect
  }

  const getStatusBadge = (status: Transaction["status"]) => {
    switch (status) {
      case "completed":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-300">
            <Check className="h-3 w-3" />
            Selesai
          </span>
        )
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">
            <Clock className="h-3 w-3" />
            Menunggu
          </span>
        )
      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900/30 dark:text-red-300">
            <X className="h-3 w-3" />
            Dibatalkan
          </span>
        )
    }
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Selamat datang, {user?.name}! Kelola pesanan dan profil Anda di sini.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 sticky top-24">
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200 dark:border-gray-800">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="font-medium">{user?.name}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
              </div>
            </div>

            <nav>
              <ul className="space-y-1">
                <li>
                  <button
                    onClick={() => setActiveTab("orders")}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                      activeTab === "orders"
                        ? "bg-primary/10 text-primary dark:bg-primary/20"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    <ShoppingBag className="h-4 w-4" />
                    Pesanan Saya
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab("profile")}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                      activeTab === "profile"
                        ? "bg-primary/10 text-primary dark:bg-primary/20"
                        : "hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    <User className="h-4 w-4" />
                    Profil Saya
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {activeTab === "orders" && (
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Pesanan Saya</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Cari pesanan..."
                    className="rounded-lg border border-gray-300 pl-10 pr-4 py-2 text-sm dark:border-gray-700 dark:bg-gray-800"
                  />
                </div>
              </div>

              {isLoadingTransactions ? (
                <div className="flex justify-center py-12">
                  <RefreshCw className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : transactions.length === 0 ? (
                <div className="text-center py-12">
                  <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                    <ShoppingBag className="h-10 w-10 text-gray-500" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Belum ada pesanan</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">Anda belum melakukan pembelian apapun</p>
                  <Link href="/products">
                    <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-all hover:bg-primary/90">
                      Mulai Belanja
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {transactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden"
                    >
                      <div className="bg-gray-50 dark:bg-gray-800/50 p-4 flex flex-wrap justify-between items-center gap-2">
                        <div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(transaction.date).toLocaleDateString("id-ID", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </div>
                          <div className="font-medium">{transaction.invoiceNumber}</div>
                        </div>
                        <div className="flex items-center gap-3">
                          {getStatusBadge(transaction.status)}
                          <Link href={`/dashboard/orders/${transaction.id}`}>
                            <button className="text-sm text-primary hover:underline">Detail</button>
                          </Link>
                        </div>
                      </div>

                      <div className="p-4">
                        <div className="space-y-4">
                          {transaction.items.map((item) => (
                            <div key={item.id} className="flex gap-3">
                              <div className="h-16 w-16 rounded-md bg-gray-100 dark:bg-gray-800 overflow-hidden">
                                <Image
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  width={64}
                                  height={64}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <div className="font-medium">{item.name}</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  {item.qty} x Rp{item.price.toLocaleString()}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex flex-wrap justify-between items-center gap-2">
                          <div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Total Pembayaran</div>
                            <div className="font-semibold text-lg">Rp{transaction.amount.toLocaleString()}</div>
                          </div>
                          <div className="flex gap-2">
                            {transaction.status === "pending" && (
                              <Link href="/payment">
                                <button className="rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-white transition-all hover:bg-primary/90">
                                  Bayar Sekarang
                                </button>
                              </Link>
                            )}
                            <button className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-sm dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                              <FileText className="h-4 w-4" />
                              Invoice
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "profile" && (
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
              <h2 className="text-xl font-bold mb-6">Profil Saya</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Nama Lengkap</label>
                  <input
                    type="text"
                    defaultValue={user?.name}
                    className="w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    defaultValue={user?.email}
                    className="w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Nomor WhatsApp</label>
                  <input
                    type="tel"
                    defaultValue={user?.whatsapp}
                    className="w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Password</label>
                  <input
                    type="password"
                    defaultValue="********"
                    className="w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  />
                </div>

                <div className="pt-4">
                  <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-all hover:bg-primary/90">
                    Simpan Perubahan
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
