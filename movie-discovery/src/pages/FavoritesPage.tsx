import { Link } from 'react-router-dom'
import { EmptyState } from '../components/EmptyState'
import { MovieGrid } from '../components/MovieGrid'
import { useFavorites } from '../hooks/useFavorites'

export function FavoritesPage() {
  const { favorites, isFavorite, toggleFavorite } = useFavorites()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Your Favorites</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Movies saved locally in your browser — no account needed.
        </p>
      </div>

      {favorites.length === 0 ? (
        <EmptyState
          title="No favorites yet"
          description="Browse movies and tap the heart icon to save them here."
          icon="❤️"
        />
      ) : (
        <>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {favorites.length} saved movie{favorites.length !== 1 ? 's' : ''}
          </p>
          <MovieGrid
            movies={favorites}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
          />
        </>
      )}

      <Link to="/" className="inline-block text-sm font-medium text-cinema-accent hover:underline">
        ← Discover more movies
      </Link>
    </div>
  )
}
