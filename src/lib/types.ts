export interface ProductType {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
}

export interface UserDataType {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
}
