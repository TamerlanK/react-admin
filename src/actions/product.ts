import axiosInstance from "../api/axiosInstance"
import { ProductType } from "../lib/types"

export const deleteProduct = async (id: number) => {
  try {
    const response = await axiosInstance.delete(
      `https://dummyjson.com/products/${id}`
    )
    console.log(`Product with ID ${id} deleted successfully`)
    console.log(response.data)
    return response.data
  } catch (error: any) {
    console.error("Error deleting product:", error)
    throw new Error(error)
  }
}

export const updateProduct = async (
  id: number,
  data: Partial<Omit<ProductType, "id">>
) => {
  try {
    const response = await axiosInstance.put(
      `https://dummyjson.com/products/${id}`,
      data
    )
    console.log(`Product with ID ${id} updated successfully`)
    console.log(response.data)
  } catch (error: any) {
    throw new Error(error)
  }
}

export const addProduct = async (data: Omit<ProductType, "id">) => {
  try {
    const response = await axiosInstance.post(
      "https://dummyjson.com/products/add",
      data,
      { headers: { "Content-Type": "application/json" } }
    )
    console.log(`New product added`)
    console.log(response.data)
  } catch (error: any) {
    console.error("Error adding product:", error)
    throw new Error(error)
  }
}
