import axiosInstance from "../api/axiosInstance"
import { ProductType } from "../lib/types"

export const deleteProduct = async (id: number) => {
  try {
    const response = await axiosInstance.delete(
      `https://dummyjson.com/products/${id}`
    )
    console.log(`Product with ID ${id} deleted successfully`)
    console.log(response.data)
  } catch (error) {
    console.error("Error deleting product:", error)
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
  } catch (error) {
    console.error("Error updating product:", error)
  }
}
