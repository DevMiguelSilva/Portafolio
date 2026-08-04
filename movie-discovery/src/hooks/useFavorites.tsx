import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { Movie } from '../types/movie'

const STORAGE_KEY = 'movie-discovery-favorites'

interface FavoritesContextValue {
  favorites: Movie[]
  isFavorite: (id: number) => boolean
  toggleFavorite: (movie: Movie) => void
  removeFavorite: (id: number) => void
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null)

function readFavorites(): Movie[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? (JSON.parse(stored) as Movie[]) : []
  } catch {
    return []
  }
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Movie[]>([])

  useEffect(() => {
    setFavorites(readFavorites())
  }, [])

  const persist = useCallback((next: Movie[]) => {
    setFavorites(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }, [])

  const isFavorite = useCallback(
    (id: number) => favorites.some((movie) => movie.id === id),
    [favorites]
  )

  const toggleFavorite = useCallback(
    (movie: Movie) => {
      const exists = favorites.some((item) => item.id === movie.id)
      persist(exists ? favorites.filter((item) => item.id !== movie.id) : [...favorites, movie])
    },
    [favorites, persist]
  )

  const removeFavorite = useCallback(
    (id: number) => {
      persist(favorites.filter((movie) => movie.id !== id))
    },
    [favorites, persist]
  )

  const value = useMemo(
    () => ({ favorites, isFavorite, toggleFavorite, removeFavorite }),
    [favorites, isFavorite, toggleFavorite, removeFavorite]
  )

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider')
  }
  return context
}
