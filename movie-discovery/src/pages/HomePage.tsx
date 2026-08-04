import { useCallback, useEffect, useState } from 'react'
import { getTrendingMovies, searchMovies } from '../api/tmdb'
import type { Movie } from '../types/movie'
import { EmptyState } from '../components/EmptyState'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { MovieGrid } from '../components/MovieGrid'
import { SearchBar } from '../components/SearchBar'
import { useFavorites } from '../hooks/useFavorites'

export function HomePage() {
  const { isFavorite, toggleFavorite } = useFavorites()
  const [query, setQuery] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadMovies = useCallback(async (term: string) => {
    setLoading(true)
    setError(null)
    try {
      const data = term.trim()
        ? await searchMovies(term.trim())
        : await getTrendingMovies()
      setMovies(data.results)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load movies')
      setMovies([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadMovies(searchTerm)
  }, [loadMovies, searchTerm])

  const handleSearch = () => {
    setSearchTerm(query)
  }

  return (
    <div className="space-y-8">
      <section className="rounded-2xl bg-gradient-to-br from-cinema-900 via-cinema-800 to-cinema-950 px-6 py-12 text-white sm:px-10">
        <p className="mb-2 text-sm uppercase tracking-widest text-cinema-gold">Portfolio Project #1</p>
        <h1 className="font-display text-5xl tracking-wide sm:text-6xl">Discover Movies</h1>
        <p className="mt-3 max-w-xl text-gray-300">
          Search trending films, check scores, watch trailers, and read reviews — all powered by TMDB.
        </p>
        <div className="mt-8">
          <SearchBar value={query} onChange={setQuery} onSubmit={handleSearch} />
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">
              {searchTerm ? `Results for "${searchTerm}"` : 'Trending This Week'}
            </h2>
            {!loading && movies.length > 0 && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {movies.length} movie{movies.length !== 1 ? 's' : ''} found
              </p>
            )}
          </div>
          {searchTerm && (
            <button
              type="button"
              onClick={() => {
                setQuery('')
                setSearchTerm('')
              }}
              className="text-sm font-medium text-cinema-accent hover:underline"
            >
              Clear search
            </button>
          )}
        </div>

        {loading && <LoadingSpinner label="Fetching movies…" />}

        {error && (
          <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/50 dark:text-red-300">
            {error}
          </div>
        )}

        {!loading && !error && movies.length === 0 && (
          <EmptyState
            title="No movies found"
            description="Try a different search term or browse trending movies instead."
          />
        )}

        {!loading && !error && movies.length > 0 && (
          <MovieGrid
            movies={movies}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
          />
        )}
      </section>
    </div>
  )
}
