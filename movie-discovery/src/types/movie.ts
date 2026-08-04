export interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  vote_count: number
  genre_ids?: number[]
  genres?: Genre[]
  runtime?: number
  tagline?: string
}

export interface Genre {
  id: number
  name: string
}

export interface Review {
  id: string
  author: string
  author_details: {
    rating: number | null
    avatar_path: string | null
  }
  content: string
  created_at: string
  url: string
}

export interface Video {
  id: string
  key: string
  name: string
  site: string
  type: string
  official: boolean
}

export interface PaginatedResponse<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}
