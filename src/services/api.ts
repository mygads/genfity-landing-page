// User API
export const userApi = {
    getCurrentUser: async () => {
        const response = await fetch("/api/auth/me")
        if (!response.ok) throw new Error("Failed to fetch user")
            return response.json()
        },
    
        updateUser: async (userId: string, data: any) => {
            const response = await fetch(`/api/users/${userId}`, {
                method: "PUT",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            if (!response.ok) throw new Error("Failed to update user")
            return response.json()
        },
    }
    
    // Transaction API
    export const transactionApi = {
        getTransactions: async () => {
            const response = await fetch("/api/transactions")
            if (!response.ok) throw new Error("Failed to fetch transactions")
            return response.json()
        },
    
        getTransaction: async (id: string) => {
            const response = await fetch(`/api/transactions/${id}`)
            if (!response.ok) throw new Error("Failed to fetch transaction")
            return response.json()
        },
    
        createTransaction: async (data: any) => {
            const response = await fetch("/api/transactions", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
            if (!response.ok) throw new Error("Failed to create transaction")
            return response.json()
        },
    
        updateTransactionStatus: async (id: string, status: string, paymentDate?: string) => {
            const response = await fetch(`/api/transactions/${id}`, {
                method: "PATCH",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({ status, paymentDate }),
            })
        if (!response.ok) throw new Error("Failed to update transaction")
        return response.json()
    },
}
    
    // Product API
export const productApi = {
    getProducts: async (params?: { category?: string; isAddon?: boolean }) => {
        const queryParams = new URLSearchParams()
        if (params?.category) queryParams.append("category", params.category)
        if (params?.isAddon !== undefined) queryParams.append("isAddon", params.isAddon.toString())

        const url = `/api/products${queryParams.toString() ? `?${queryParams.toString()}` : ""}`
        const response = await fetch(url)
        if (!response.ok) throw new Error("Failed to fetch products")
        return response.json()
    },

    getProduct: async (id: string) => {
        const response = await fetch(`/api/products/${id}`)
        if (!response.ok) throw new Error("Failed to fetch product")
        return response.json()
    },
}
  