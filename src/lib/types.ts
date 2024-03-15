export interface ProductType {
  id: number
  title: string
  price: number
  brand: string
  thumbnail: string
  images: string[]
}

export interface TodoType {
  id: number
  todo: string
  completed: boolean
}

export interface QuoteType {
  id: number
  quote: string
  author: string
}

export interface UserType {
  id: number
  firstName: string
  lastName: string
  age: number
  email: string
}

export interface AuthUserDataType {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
}
