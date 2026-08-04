import type { Movie, PaginatedResponse, Review, Video } from '../types/movie'

const BASE_URL = 'https://api.themoviedb.org/3'
const IMAGE_BASE = 'https://image.tmdb.org/t/p'

function getApiKey(): string {
  const key = import.meta.env.VITE_TMDB_API_KEY
  if (!key || key === 'your_tmdb_api_key_here') {
    throw new Error(
      'Missing TMDB API key. Copy .env.example to .env and add your key from https://www.themoviedb.org/settings/api'
    )
  }
  return key
}

async function fetchTmdb<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const url = new URL(`${BASE_URL}${endpoint}`)
  url.searchParams.set('api_key', getApiKey())
  url.searchParams.set('language', 'en-US')
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value))

  const response = await fetch(url.toString())
  if (!response.ok) {
    throw new Error(`TMDB request failed: ${response.status}`)
  }
  return response.json() as Promise<T>
}

export function posterUrl(path: string | null, size: 'w342' | 'w500' | 'original' = 'w500'): string | null {
  if (!path) return null
  return `${IMAGE_BASE}/${size}${path}`
}

export function backdropUrl(path: string | null): string | null {
  return posterUrl(path, 'original')
}

export function profileUrl(path: string | null): string | null {
  if (!path) return null
  return `${IMAGE_BASE}/w45${path}`
}

export function searchMovies(query: string, page = 1) {
  return fetchTmdb<PaginatedResponse<Movie>>('/search/movie', {
    query,
    page: String(page),
    include_adult: 'false',
  })
}

export function getTrendingMovies(page = 1) {
  return fetchTmdb<PaginatedResponse<Movie>>('/trending/movie/week', {
    page: String(page),
  })
}

export function getMovieDetails(id: number) {
  return fetchTmdb<Movie>(`/movie/${id}`)
}

export function getMovieReviews(id: number, page = 1) {
  return fetchTmdb<PaginatedResponse<Review>>(`/movie/${id}/reviews`, {
    page: String(page),
  })
}

export function getMovieVideos(id: number) {
  return fetchTmdb<{ results: Video[] }>(`/movie/${id}/videos`)
}

export function getYoutubeTrailer(videos: Video[]): Video | undefined {
  return videos.find(
    (video) => video.site === 'YouTube' && (video.type === 'Trailer' || video.type === 'Teaser')
  )
}

export function formatScore(score: number): string {
  return score.toFixed(1)
}

export function scoreColor(score: number): string {
  if (score >= 7.5) return 'text-green-400'
  if (score >= 6) return 'text-cinema-gold'
  if (score >= 4) return 'text-orange-400'
  return 'text-red-400'
}

export function formatDate(date: string): string {
  if (!date) return 'Unknown'
  return new Date(date).toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength).trim()}…`
}
