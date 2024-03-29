import axiosInstance from "../api/axiosInstance"
import { UserType } from "../lib/types"

export const deleteUser = async (id: number) => {
  try {
    const response = await axiosInstance.delete(
      `https://dummyjson.com/users/${id}`
    )
    console.log(`User with ID ${id} deleted successfully`)
    console.log(response.data)
  } catch (error: any) {
    console.error("Error deleting user:", error)
    throw new Error(error)
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
  } catch (error: any) {
    console.error("Error updating user:", error)
    throw new Error(error)
  }
}

export const createUser = async (
  data: Partial<Omit<UserType, "id">>
) => {
  try {
    const response = await axiosInstance.post(
      `https://dummyjson.com/users/add`,
      data
    )
    console.log(`User with ${response.data?.id} created successfully`)
    console.log(response.data)
  } catch (error: any) {
    console.error("Error creating user:", error)
    throw new Error(error)
  }
}
