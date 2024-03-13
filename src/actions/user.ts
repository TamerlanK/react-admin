import axiosInstance from "../api/axiosInstance"
import { UserType } from "../lib/types"

export const deleteUser = async (id: number) => {
  try {
    const response = await axiosInstance.delete(
      `https://dummyjson.com/users/${id}`
    )
    console.log(`User with ID ${id} deleted successfully`)
    console.log(response.data)
  } catch (error) {
    console.error("Error deleting user:", error)
  }
}

export const updateUser = async (
  id: number,
  data: Partial<Omit<UserType, "id">>
) => {
  try {
    const response = await axiosInstance.put(
      `https://dummyjson.com/users/${id}`,
      data
    )
    console.log(`User with ID ${id} updated successfully`)
    console.log(response.data)
  } catch (error) {
    console.error("Error updating user:", error)
  }
}
