"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/components/Auth/AuthContext"
import { useRouter } from "next/navigation"
import { ArrowLeft, Eye, EyeOff, Lock, Mail, RefreshCw, User } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    password: "",
  })
  const { login, register } = useAuth()
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      let success = false

      if (isLogin) {
        success = await login(formData.email, formData.password)
      } else {
        success = await register(formData.name, formData.email, formData.whatsapp, formData.password)
      }

      if (success) {
        // Redirect to dashboard or previous page
        router.push("/dashboard")
      }
    } catch (error) {
      console.error("Authentication error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-12 pt-24 px-4">
      <div className="max-w-md mx-auto">
        <Link href="/">
          <button className="mb-6 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Beranda
          </button>
        </Link>

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">{isLogin ? "Masuk ke Akun Anda" : "Daftar Akun Baru"}</h1>
            <p className="text-gray-500 dark:text-gray-400">
              {isLogin
                ? "Masuk untuk melihat pesanan dan mengelola akun Anda"
                : "Daftar untuk mulai berbelanja dan melacak pesanan Anda"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Nama Lengkap
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 p-2.5 pl-10 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 p-2.5 pl-10 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  required
                />
              </div>
            </div>

            {!isLogin && (
              <div>
                <label htmlFor="whatsapp" className="block text-sm font-medium mb-1">
                  Nomor WhatsApp
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span className="text-gray-400">+62</span>
                  </div>
                  <input
                    type="tel"
                    id="whatsapp"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 p-2.5 pl-12 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    placeholder="8123456789"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 p-2.5 pl-10 pr-10 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-600 dark:text-gray-400">
                    Ingat saya
                  </label>
                </div>
                <a href="#" className="text-sm text-primary hover:underline">
                  Lupa password?
                </a>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary py-3 font-medium text-white transition-all hover:bg-primary/90 disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  {isLogin ? "Masuk..." : "Mendaftar..."}
                </>
              ) : isLogin ? (
                "Masuk"
              ) : (
                "Daftar"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-1 text-primary hover:underline focus:outline-none"
              >
                {isLogin ? "Daftar" : "Masuk"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
