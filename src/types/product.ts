export type Product = {
  category: string
  description: string
  id: number
  image: string
  price: number
  rating: {
    rate: number
    count: number
  }
  title: string
}

export type Categories = 'electronics' | 'jewelry' | "men's clothing" | "women's clothing" | ''

export type PriceTypeOrder = 'asc' | 'desc'

export interface Comments {
  username: number
  text: string
  timestamp: string
}
