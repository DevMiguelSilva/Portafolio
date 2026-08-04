import type { Movie } from '../types/movie'
import { MovieCard } from './MovieCard'

interface MovieGridProps {
  movies: Movie[]
  isFavorite: (id: number) => boolean
  onToggleFavorite: (movie: Movie) => void
}

export function MovieGrid({ movies, isFavorite, onToggleFavorite }: MovieGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          isFavorite={isFavorite(movie.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  )
}
