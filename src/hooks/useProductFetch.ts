import { useState, useEffect } from "react"
import axios from "axios"
import { ProductType } from "../lib/types"

const useProductFetch = (token: string | null) => {
  const [products, setProducts] = useState<ProductType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://dummyjson.com/products?limit=100",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        if (response.status === 200) {
          setProducts(response.data.products)
        } else {
          throw new Error("Failed to fetch products")
        }
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [token])

  return { products, loading }
}

export default useProductFetch
